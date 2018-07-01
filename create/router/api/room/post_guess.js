//
// TODO: extract shared code between this file and post_init-player
//   into helpers.js
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { any, combine, containedIn, mAppend } from 'fes'
import { getCurrentAndOtherPlayerData, sanitize, toggleTurn } from './helpers'
import {
  createIfRequestIsValid,
  ifResponseIsNot404,
  ifStatusIsNot404,
} from 'server/utils'
import {
  dal,
  docidToHash,
  hashToDocid,
  pickIdAndRev,
  removeCouchdbProperties,
} from 'server/db'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('guess'),
  atLeastOneLetter = any,
  optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  }

//
//------//
// Main //
//------//

function createPostGuess(arg) {
  const { router, websocketServer } = arg,
    addGuess = createAddGuess(websocketServer)

  router.post('/:roomHash/player/:playerHash/guess', ifRequestIsValid(addGuess))

  return arg
}

function createAddGuess(websocketServer) {
  const addGuessAndReturnCurrentPlayer = createAddGuessAndReturnCurrentPlayer(
    websocketServer
  )

  return ctx => {
    const { body } = ctx.request
    body.guess = body.guess.toLowerCase()

    const { playerHash, roomHash } = ctx.params,
      guess = ctx.request.body,
      errorArgs = [playerHash, roomHash, guess],
      authorizeThenGetPlayerData = createAuthorizeThenGetPlayerData(
        ctx,
        playerHash
      )

    return dal.activeRoom
      .get({ _id: hashToDocid(roomHash) }, optionsForGet)
      .then(ifResponseIsNot404(ctx, authorizeThenGetPlayerData))
      .then(ifStatusIsNot404(addGuessAndReturnCurrentPlayer))
      .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArgs))
  }
}

function createAuthorizeThenGetPlayerData(ctx, currentPlayerHash) {
  return function authorizeThenGetPlayerData(roomData) {
    const { player1Hash, player2Hash } = roomData,
      possiblePlayerHashes = new Set([player1Hash, player2Hash])

    if (!possiblePlayerHashes.has(currentPlayerHash)) {
      ctx.status = 404
      ctx.body = {
        error: "The room isn't associated with your specified playerHash",
      }
      return { is404: true }
    }

    return Promise.all([
      ctx,
      roomData,
      getCurrentAndOtherPlayerData({
        currentPlayerHash,
        player1Hash,
        player2Hash,
      }),
    ])
  }
}

function createAddGuessAndReturnCurrentPlayer(websocketServer) {
  return result => {
    const [ctx, couchdbRoomData, { currentPlayer, otherPlayer }] = result,
      { guess: guessedWord } = ctx.request.body,
      { word } = otherPlayer,
      roomIdAndRev = pickIdAndRev(couchdbRoomData),
      playerIdAndRev = pickIdAndRev(currentPlayer),
      roomData = removeCouchdbProperties(couchdbRoomData),
      playerData = removeCouchdbProperties(currentPlayer),
      hasAnyMatchingLetters = atLeastOneLetter(containedIn(word))(
        guessedWord
      )

    const guess = {
      hasAnyMatchingLetters,
      word: guessedWord,
      isCorrect: word === guessedWord,
    }

    roomData.playerNumberTurn = toggleTurn(roomData.playerNumberTurn)
    mAppend(guess)(playerData.guesses)

    return Promise.all([
      dal.activeRoom.update(combine(roomData)(roomIdAndRev)),
      dal.player.update(combine(playerData)(playerIdAndRev)),
    ]).then(() => {
      const sanitizedRoom = sanitize.room(roomData)

      websocketServer.maybeUpdateClient({
        playerHash: docidToHash(otherPlayer._id),
        data: {
          id: 'otherPlayerGuessed',
          data: {
            commitOrDispatch: 'commit',
            type: 'room/updateOtherPlayerAndRoom',
            payload: {
              otherPlayer: sanitize.player.other(playerData),
              room: sanitizedRoom,
            },
          },
        },
      })

      ctx.status = 200
      ctx.body = {
        room: sanitizedRoom,
        currentPlayer: sanitize.player.current(playerData),
      }
    })
  }
}

function createErrorMessage(playerHash, roomHash, guess) {
  return {
    friendly: 'adding your guess',
    detailed: dedent(`
      error occurred during POST guess
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        guess: ${guess}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostGuess

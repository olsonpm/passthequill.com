//
// TODO: extract shared code between this file and post_init-player
//   into helpers.js
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { any, combine, containedIn, mAppend } from 'fes'
import { authorize, getRoomAndPlayers, sanitize } from '../helpers'
import { createIfRequestIsValid, ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import {
  dal,
  docidToHash,
  pickIdAndRev,
  removeCouchdbProperties,
} from 'server/db'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('guess'),
  atLeastOneLetter = any

//
//------//
// Main //
//------//

function createPostGuess({ router, websocketServer }) {
  const addGuess = createAddGuess(websocketServer)

  router.post('/:roomHash/player/:playerHash/guess', ifRequestIsValid(addGuess))
}

//
//------------------//
// Helper Functions //
//------------------//

function createAddGuess(websocketServer) {
  return ctx => {
    const { body } = ctx.request
    body.guess = body.guess.toLowerCase().trim()

    const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

    return authorize(ctx)
      .then(
        ifStatusIsNot404(
          promiseFlow([getRoomAndPlayers, addGuessAndReturnCurrentPlayer])
        )
      )
      .catch(handleError)
  }

  // helper function scoped to 'createAddGuess'

  function addGuessAndReturnCurrentPlayer(result) {
    const { ctx, currentPlayer, otherPlayer, roomData } = result,
      { guess: guessedWord } = ctx.request.body,
      { secretWord } = otherPlayer,
      roomIdAndRev = pickIdAndRev(roomData),
      playerIdAndRev = pickIdAndRev(currentPlayer),
      updatedRoomData = removeCouchdbProperties(roomData),
      playerData = removeCouchdbProperties(currentPlayer),
      hasAnyMatchingLetters = atLeastOneLetter(containedIn(secretWord))(
        guessedWord
      )

    const guess = {
      hasAnyMatchingLetters,
      word: guessedWord,
      isCorrect: secretWord === guessedWord,
    }

    mToggleTurn(updatedRoomData)
    mAppend(guess)(playerData.guesses)

    return Promise.all([
      dal.activeRoom.update(combine(updatedRoomData)(roomIdAndRev)),
      dal.player.update(combine(playerData)(playerIdAndRev)),
    ]).then(() => {
      const sanitizedRoom = sanitize.room(updatedRoomData)

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

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params,
    guess = ctx.request.body

  return {
    friendly: 'adding your guess',
    detailed: tedent(`
      error occurred during POST guess
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        guess: ${guess}
    `),
  }
}

function mToggleTurn(updatedRoomData) {
  const { playerNumberTurn } = updatedRoomData

  updatedRoomData.playerNumberTurn = playerNumberTurn === 1 ? 2 : 1

  return updatedRoomData
}

//
//---------//
// Exports //
//---------//

export default createPostGuess

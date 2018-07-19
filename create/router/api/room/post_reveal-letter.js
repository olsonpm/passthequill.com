//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { combine, last, mAssignOver } from 'fes'
import { sanitize } from './helpers'
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

const ifRequestIsValid = createIfRequestIsValid('revealLetter'),
  optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  }

//
//------//
// Main //
//------//

function createPostRevealLetter(arg) {
  const { router, websocketServer } = arg,
    revealLetter = createRevealLetter(websocketServer)

  router.post(
    '/:roomHash/player/:playerHash/mark-chosen-letter',
    ifRequestIsValid(revealLetter)
  )

  return arg
}

function createRevealLetter(websocketServer) {
  return ctx => {
    const { playerHash, roomHash } = ctx.params,
      { chosenLetter } = ctx.request.body,
      errorArgs = [playerHash, roomHash, chosenLetter],
      handleError = handleErrorDuringRoute(ctx, createErrorMessage, errorArgs)

    try {
      const authorizeThenGetOtherPlayerData = createAuthorizeThenGetOtherPlayerData(
          ctx
        ),
        revealLetterAndReturnOtherPlayer = createRevealLetterAndReturnOtherPlayer(
          websocketServer
        )

      return dal.activeRoom
        .get({ _id: hashToDocid(roomHash) }, optionsForGet)
        .then(ifResponseIsNot404(ctx, authorizeThenGetOtherPlayerData))
        .then(ifStatusIsNot404(revealLetterAndReturnOtherPlayer))
        .catch(handleError)
    } catch (error) {
      return handleError(error)
    }
  }
}

function createAuthorizeThenGetOtherPlayerData(ctx) {
  const { playerHash: currentPlayerHash } = ctx.params

  return function authorizeThenGetOtherPlayerData(roomData) {
    const { player1Hash, player2Hash } = roomData,
      possiblePlayerHashes = new Set([player1Hash, player2Hash])

    if (!possiblePlayerHashes.has(currentPlayerHash)) {
      ctx.status = 404
      ctx.body = {
        error: "The room isn't associated with your specified playerHash",
      }
      return { is404: true }
    }

    const otherPlayerHash =
      currentPlayerHash === player1Hash ? player2Hash : player1Hash

    return Promise.all([
      ctx,
      dal.player.get({ _id: hashToDocid(otherPlayerHash) }),
    ])
  }
}

function createRevealLetterAndReturnOtherPlayer(websocketServer) {
  return ([ctx, couchdbOtherPlayerData]) => {
    const playerIdAndRev = pickIdAndRev(couchdbOtherPlayerData),
      otherPlayerData = removeCouchdbProperties(couchdbOtherPlayerData),
      { chosenLetter } = ctx.request.body,
      lastGuess = last(otherPlayerData.guesses)

    mAssignOver(lastGuess)({
      chosenLetter,
    })

    return dal.player
      .update(combine(otherPlayerData)(playerIdAndRev))
      .then(() => {
        websocketServer.maybeUpdateClient({
          playerHash: docidToHash(couchdbOtherPlayerData._id),
          data: {
            id: 'otherPlayerChoseLetter',
            data: {
              commitOrDispatch: 'commit',
              type: 'room/updateCurrentPlayer',
              payload: {
                currentPlayer: sanitize.player.current(otherPlayerData),
              },
            },
          },
        })

        ctx.status = 200
        ctx.body = {
          otherPlayer: sanitize.player.other(otherPlayerData),
        }
      })
  }
}

function createErrorMessage(playerHash, roomHash, chosenLetter) {
  return {
    friendly: 'marking your chosen letter',
    detailed: dedent(`
      error occurred during POST mark-chosen-letter
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        chosenLetter: ${chosenLetter}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostRevealLetter

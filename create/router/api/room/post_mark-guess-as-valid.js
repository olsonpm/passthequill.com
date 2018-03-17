//
// TODO: extract shared code between this file and post_init-player
//   into helpers.js
//
// TODO: update friend's client via web sockets
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { alwaysReturn as justReturn, combine, last, mAssignOver } from 'fes'
import { sanitize } from './helpers'
import { ifResponseIsNot404, ifStatusIsNot404 } from 'server/utils'
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

const optionsForGet = {
  allow404: true,
  returnRawResponse: true,
}

//
//------//
// Main //
//------//

function createPostMarkGuessAsValid(arg) {
  const { router, websocketServer } = arg,
    markGuessAsValid = createMarkGuessAsValid(websocketServer)

  router.post(
    '/:roomHash/player/:playerHash/mark-guess-as-valid',
    markGuessAsValid
  )

  return arg
}

function createMarkGuessAsValid(websocketServer) {
  return ctx => {
    const { playerHash, roomHash } = ctx.params,
      errorArgs = [playerHash, roomHash],
      authorizeThenGetOtherPlayer = createAuthorizeThenGetOtherPlayer(ctx)

    return dal.activeRoom
      .get({ _id: hashToDocid(roomHash) }, optionsForGet)
      .then(ifResponseIsNot404(ctx, authorizeThenGetOtherPlayer))
      .then(
        ifStatusIsNot404(async ([ctx, otherPlayerData]) => {
          const otherPlayer = await markGuessAsValidAndReturnOtherPlayer(
            otherPlayerData
          )

          websocketServer.maybeUpdateClient({
            playerHash: docidToHash(otherPlayerData._id),
            data: {
              id: 'otherPlayerMarkedGuessAsValid',
              data: {
                commitOrDispatch: 'commit',
                type: 'room/updateCurrentPlayer',
                payload: {
                  currentPlayer: sanitize.player.current(otherPlayer),
                },
              },
            },
          })

          ctx.status = 200
          ctx.body = { otherPlayer: sanitize.player.other(otherPlayer) }
        })
      )
      .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArgs))
  }
}

function createAuthorizeThenGetOtherPlayer(ctx) {
  const { playerHash: currentPlayerHash } = ctx.params

  return roomData => {
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

function markGuessAsValidAndReturnOtherPlayer(couchdbPlayerData) {
  const playerIdAndRev = pickIdAndRev(couchdbPlayerData),
    playerData = removeCouchdbProperties(couchdbPlayerData),
    lastGuess = last(playerData.guesses)

  mAssignOver(lastGuess)({
    isValid: true,
    wasReviewed: true,
  })

  return dal.player
    .update(combine(playerData)(playerIdAndRev))
    .then(justReturn(playerData))
}

function createErrorMessage(playerHash, roomHash) {
  return {
    friendly: "marking your friend's guess as valid",
    detailed: dedent(`
      error occurred during POST mark-guess-as-valid
        playerHash: ${playerHash}
        roomHash: ${roomHash}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostMarkGuessAsValid

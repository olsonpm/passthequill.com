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
import { sanitize, toggleTurn } from './helpers'
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

function createPostMarkGuessAsInvalid(arg) {
  const { router, websocketServer } = arg,
    markGuessAsInvalid = createMarkGuessAsInvalid(websocketServer)

  router.post(
    '/:roomHash/player/:playerHash/mark-guess-as-invalid',
    markGuessAsInvalid
  )

  return arg
}

function createMarkGuessAsInvalid(websocketServer) {
  return ctx => {
    const { playerHash, roomHash } = ctx.params,
      errorArgs = [playerHash, roomHash],
      authorizeThenGetOtherPlayerAndRoomData = createAuthorizeThenGetOtherPlayerAndRoomData(
        ctx
      )

    return dal.activeRoom
      .get({ _id: hashToDocid(roomHash) }, optionsForGet)
      .then(ifResponseIsNot404(ctx, authorizeThenGetOtherPlayerAndRoomData))
      .then(
        ifStatusIsNot404(async ([ctx, roomData, otherPlayerData]) => {
          const [otherPlayer, room] = await Promise.all([
            markGuessAsInvalidAndReturnOtherPlayer(otherPlayerData),
            updateTurnAndReturnRoomData(roomData),
          ])

          const sanitizedRoom = sanitize.room(room)

          websocketServer.maybeUpdateClient({
            playerHash: docidToHash(otherPlayerData._id),
            data: {
              id: 'otherPlayerMarkedGuessAsInvalid',
              data: {
                commitOrDispatch: 'commit',
                type: 'room/updateCurrentPlayerAndRoom',
                payload: {
                  currentPlayer: sanitize.player.current(otherPlayer),
                  room: sanitizedRoom,
                },
              },
            },
          })

          ctx.status = 200
          ctx.body = {
            otherPlayer: sanitize.player.other(otherPlayer),
            room: sanitizedRoom,
          }
        })
      )
      .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArgs))
  }
}

function createAuthorizeThenGetOtherPlayerAndRoomData(ctx) {
  const { playerHash: currentPlayerHash } = ctx.params

  return function authorizeThenGetOtherPlayerAndRoomData(roomData) {
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
      roomData,
      dal.player.get({ _id: hashToDocid(otherPlayerHash) }),
    ])
  }
}

function markGuessAsInvalidAndReturnOtherPlayer(couchdbPlayerData) {
  const playerIdAndRev = pickIdAndRev(couchdbPlayerData),
    playerData = removeCouchdbProperties(couchdbPlayerData),
    lastGuess = last(playerData.guesses)

  mAssignOver(lastGuess)({
    isValid: false,
    wasReviewed: true,
  })

  return dal.player
    .update(combine(playerData)(playerIdAndRev))
    .then(justReturn(playerData))
}

function updateTurnAndReturnRoomData(couchdbRoomData) {
  const roomData = removeCouchdbProperties(couchdbRoomData),
    roomIdAndRev = pickIdAndRev(couchdbRoomData)

  roomData.playerNumberTurn = toggleTurn(roomData.playerNumberTurn)

  return dal.activeRoom
    .update(combine(roomData)(roomIdAndRev))
    .then(justReturn(roomData))
}

function createErrorMessage(playerHash, roomHash) {
  return {
    friendly: "marking your friend's guess as invalid",
    detailed: dedent(`
      error occurred during POST mark-guess-as-invalid
        playerHash: ${playerHash}
        roomHash: ${roomHash}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostMarkGuessAsInvalid

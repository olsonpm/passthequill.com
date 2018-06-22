//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { combine } from 'fes'
import { getCurrentAndOtherPlayerData, sanitize } from './helpers'
import {
  dal,
  docidToHash,
  hashToDocid,
  removeCouchdbProperties,
} from 'server/db'
import {
  createIfRequestIsValid,
  ifResponseIsNot404,
  ifStatusIsNot404,
} from 'server/utils'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('initPlayer'),
  optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  }

//
//------//
// Main //
//------//

function createPostInitPlayer(arg) {
  const { router, websocketServer } = arg,
    initializePlayer = createInitializePlayer(websocketServer)

  router.post(
    '/:roomHash/player/:playerHash',
    ifRequestIsValid(initializePlayer)
  )

  return arg
}

function createInitializePlayer(websocketServer) {
  const initPlayerAndReturnBothPlayersData = createInitPlayerAndReturnBothPlayersData(
    websocketServer
  )

  return ctx => {
    const { playerHash, roomHash } = ctx.params,
      { body } = ctx.request

    body.word = body.word.toLowerCase()

    const { displayName, word } = body,
      errorArgs = [playerHash, roomHash, displayName, word],
      authorizeThenGetPlayerData = createAuthorizeThenGetPlayerData(
        ctx,
        playerHash
      )

    return dal.activeRoom
      .get({ _id: hashToDocid(roomHash) }, optionsForGet)
      .then(ifResponseIsNot404(ctx, authorizeThenGetPlayerData))
      .then(ifStatusIsNot404(initPlayerAndReturnBothPlayersData))
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
      getCurrentAndOtherPlayerData({
        currentPlayerHash,
        player1Hash,
        player2Hash,
      }),
    ])
  }
}

function createInitPlayerAndReturnBothPlayersData(websocketServer) {
  return result => {
    const [ctx, { currentPlayer, otherPlayer }] = result,
      newPlayerData = ctx.request.body,
      { _id, _rev } = currentPlayer,
      existingPlayerData = removeCouchdbProperties(currentPlayer),
      playerData = combine(newPlayerData)(existingPlayerData)

    return dal.player.update(combine(playerData)({ _id, _rev })).then(() => {
      websocketServer.maybeUpdateClient({
        playerHash: docidToHash(otherPlayer._id),
        data: {
          id: 'otherPlayerInitialized',
          data: {
            commitOrDispatch: 'commit',
            type: 'room/updateOtherPlayer',
            payload: {
              otherPlayer: sanitize.player.other(playerData),
            },
          },
        },
      })

      ctx.status = 200
      ctx.body = {
        currentPlayer: sanitize.player.current(playerData),
        otherPlayer: sanitize.player.other(otherPlayer),
      }
    })
  }
}

function createErrorMessage(playerHash, roomHash, displayName, word) {
  return {
    friendly: 'adding word and display name',
    detailed: dedent(`
      error occurred during POST init-player
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        displayName: ${displayName}
        word: ${word}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostInitPlayer

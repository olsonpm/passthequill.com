//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { dal, hashToDocid } from 'server/db'
import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { ifResponseIsNot404, ifStatusIsNot404 } from 'server/utils'
import { transformProperties } from 'fes'
import { getCurrentAndOtherPlayerData, sanitize } from './helpers'
import { logErrorToServer } from 'universal/utils'

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

function createGetRoute(arg) {
  const { router } = arg
  router.get('/:roomHash', getRoom)

  return arg
}

function getRoom(ctx) {
  const { roomHash } = ctx.params,
    playerHash = ctx.request.query['player-hash']

  if (!playerHash) {
    ctx.status = 400
    ctx.body = {
      error: "the query parameter 'player-hash' is required",
    }
    return
  }

  const errorArgs = [playerHash, roomHash],
    authorizeThenGetPlayerData = createAuthorizeThenGetPlayerData(
      ctx,
      playerHash
    )

  //
  // TODO: once bug is solved then remove this check.  It should be unnecessary
  //
  let _id

  try {
    _id = hashToDocid(roomHash)
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      error: `Invalid roomHash was passed: ${roomHash}`,
    }
    logErrorToServer({
      error,
      context: 'during GET api/room',
    })
    return
  }

  return dal.activeRoom
    .get({ _id }, optionsForGet)
    .then(ifResponseIsNot404(ctx, authorizeThenGetPlayerData))
    .then(ifStatusIsNot404(sanitizeAndReturnAllData))
    .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArgs))
}

function createAuthorizeThenGetPlayerData(ctx, currentPlayerHash) {
  return roomData => {
    const { player1Hash, player2Hash } = roomData,
      possiblePlayerHashes = new Set([player1Hash, player2Hash])

    if (!possiblePlayerHashes.has(currentPlayerHash)) {
      ctx.status = 404
      ctx.body = {
        error: "The room isn't associated with your queried playerHash",
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

function sanitizeAndReturnAllData(result) {
  const [ctx, roomData, currentAndOtherPlayer] = result,
    { currentPlayer, otherPlayer } = transformProperties({
      currentPlayer: sanitize.player.current,
      otherPlayer: sanitize.player.other,
    })(currentAndOtherPlayer)

  ctx.status = 200
  ctx.body = {
    currentPlayer,
    otherPlayer,
    room: sanitize.room(roomData),
  }
}

function createErrorMessage(playerHash, roomHash) {
  return {
    friendly: 'retrieving player data',
    detailed: dedent(`
      error occurred during GET player
        playerHash: ${playerHash}
        roomHash: ${roomHash}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createGetRoute

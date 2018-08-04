//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'
import tedent from 'tedent'

import { mAssignOver } from 'fes'
import { dal, removeCouchdbProperties } from 'server/db'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import {
  attachToState,
  authorize,
  getRoomAndPlayers,
  sanitize,
} from './helpers'

//
//------//
// Main //
//------//

function createGetRoute({ router }) {
  router.get('/:roomHash', attachToState({ routeName: 'getRoom' }), getRoom)
}

function getRoom(ctx) {
  const playerHash = ctx.request.query['player-hash']

  if (!playerHash) {
    ctx.status = 400
    ctx.body = {
      error: "the query parameter 'player-hash' is required",
    }
    return
  }

  const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([
          getRoomAndPlayers,
          getGuideForCurrentPlayer,
          sanitizeAndReturnAllData,
        ])
      )
    )
    .catch(handleError)
}

function getGuideForCurrentPlayer(result) {
  const { encryptedEmail } = result.currentPlayer,
    _id = couchdbBase64.encodeFromString(encryptedEmail)

  return dal.guide.get({ _id }).then(guide => mAssignOver(result)({ guide }))
}

function sanitizeAndReturnAllData(result) {
  const { ctx, guide, roomData, currentPlayer, otherPlayer } = result

  ctx.status = 200
  ctx.body = {
    currentPlayer: sanitize.player.current(currentPlayer),
    guide: removeCouchdbProperties(guide),
    otherPlayer: sanitize.player.other(otherPlayer),
    room: sanitize.room(roomData),
  }
}

function createErrorMessage(ctx) {
  const { roomHash } = ctx.params,
    playerHash = ctx.request.query['player-hash']

  return {
    friendly: 'retrieving player data',
    detailed: tedent(`
      during GET player
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

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { alwaysReturn as justReturn, combine } from 'fes'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { dal, removeCouchdbProperties } from 'server/db'
import { createIfRequestIsValid, ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import { notifyOtherPlayer } from './helpers'
import {
  attachToState,
  authorize,
  getCurrentAndOtherPlayerData,
  sanitize,
} from '../helpers'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('displayName')

//
//------//
// Main //
//------//

function createPostDisplayName({ router, websocketServer }) {
  router.post(
    '/:roomHash/player/:playerHash/display-name',
    attachToState({ websocketServer }),
    ifRequestIsValid(handlePostDisplayName)
  )
}

//
//------------------//
// Helper Functions //
//------------------//

function handlePostDisplayName(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([
          getCurrentAndOtherPlayerData,
          updateDisplayName,
          notifyOtherPlayer.displayName,
          returnCurrentPlayer,
        ])
      )
    )
    .catch(handleError)
}

function updateDisplayName({ ctx, currentPlayer, otherPlayer }) {
  const { displayName } = ctx.request.body,
    { _id, _rev } = currentPlayer,
    updatedCurrentPlayer = removeCouchdbProperties(currentPlayer)

  updatedCurrentPlayer.displayName = displayName

  return dal.player.update(combine(updatedCurrentPlayer)({ _id, _rev })).then(
    justReturn({
      ctx,
      otherPlayer,
      updatedCurrentPlayer,
    })
  )
}

function returnCurrentPlayer({ ctx, updatedCurrentPlayer }) {
  ctx.status = 200
  ctx.body = {
    currentPlayer: sanitize.player.current(updatedCurrentPlayer),
  }
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params,
    { displayName } = ctx.request.body

  return {
    friendly: 'adding display name',
    detailed: tedent(`
      error occurred during POST display-name
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        displayName: ${displayName}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostDisplayName

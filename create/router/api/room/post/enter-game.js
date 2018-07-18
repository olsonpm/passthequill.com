//
// TODO: rename room -> game when in relation to entering.  Currently 'room'
//   means a couple things which is confusing.
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { alwaysReturn as justReturn } from 'fes'
import { dal, docidToHash } from 'server/db'
import { ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import {
  attachToState,
  authorize,
  getCurrentAndOtherPlayerData,
  sanitize,
} from '../helpers'

//
//------//
// Main //
//------//

function createPostDisableGuide({ router, websocketServer }) {
  router.post(
    '/:roomHash/player/:playerHash/enter-game',
    attachToState({ websocketServer }),
    handlePostEnteringGame
  )
}

//
//------------------//
// Helper Functions //
//------------------//

function handlePostEnteringGame(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([
          getCurrentAndOtherPlayerData,
          updateEnteredGame,
          notifyOtherPlayer,
          returnCurrentPlayer,
        ])
      )
    )
    .catch(handleError)
}

function notifyOtherPlayer(arg) {
  const { ctx, otherPlayer, updatedCurrentPlayer } = arg

  ctx.state.websocketServer.maybeUpdateClient({
    playerHash: docidToHash(otherPlayer._id),
    data: {
      id: 'otherPlayerEnteredGame',
      data: {
        commitOrDispatch: 'commit',
        type: 'room/updateOtherPlayer',
        payload: {
          otherPlayer: sanitize.player.other(updatedCurrentPlayer),
        },
      },
    },
  })

  return arg
}

function updateEnteredGame({ ctx, currentPlayer, otherPlayer }) {
  currentPlayer.hasEnteredGame = true

  return dal.player.update(currentPlayer).then(
    justReturn({
      ctx,
      updatedCurrentPlayer: currentPlayer,
      otherPlayer,
    })
  )
}

function returnCurrentPlayer({ ctx, currentPlayer }) {
  ctx.body = { currentPlayer }
  ctx.status = 200
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params
  return {
    friendly: 'entering the game',
    detailed: tedent(`
      error occurred during POST entering-game
        roomHash: ${roomHash}
        playerHash: ${playerHash}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostDisableGuide

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { alwaysReturn as justReturn, assignOver, combine } from 'fes'
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

const ifRequestIsValid = createIfRequestIsValid('initPlayer')

//
//------//
// Main //
//------//

function createPostInitPlayer({ router, websocketServer }) {
  router.post(
    '/:roomHash/player/:playerHash',
    attachToState({ routeName: 'initPlayer', websocketServer }),
    ifRequestIsValid(handlePostInitPlayer)
  )
}

function handlePostInitPlayer(ctx) {
  const { body } = ctx.request,
    handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  body.secretWord = body.secretWord.toLowerCase().trim()

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([
          getCurrentAndOtherPlayerData,
          initPlayer,
          notifyOtherPlayer.displayName,
          returnCurrentAndOtherPlayer,
        ])
      )
    )
    .catch(handleError)
}

// helper function scoped to 'createInitializePlayer'

function initPlayer(result) {
  const { ctx, currentPlayer, otherPlayer } = result,
    newPlayerData = ctx.request.body,
    { _id, _rev } = currentPlayer,
    existingPlayerData = removeCouchdbProperties(currentPlayer),
    updatedCurrentPlayer = assignOver(existingPlayerData)(newPlayerData)

  return dal.player.update(combine(updatedCurrentPlayer)({ _id, _rev })).then(
    justReturn({
      ctx,
      updatedCurrentPlayer,
      otherPlayer,
    })
  )
}

function returnCurrentAndOtherPlayer(result) {
  const { ctx, otherPlayer, updatedCurrentPlayer } = result

  ctx.status = 200
  ctx.body = {
    currentPlayer: sanitize.player.current(updatedCurrentPlayer),
    otherPlayer: sanitize.player.other(otherPlayer),
  }
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params,
    { displayName, secretWord } = ctx.request.body

  return {
    friendly: 'adding secret word and display name',
    detailed: tedent(`
      error occurred during POST init-player
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        displayName: ${displayName}
        secretWord: ${secretWord}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostInitPlayer

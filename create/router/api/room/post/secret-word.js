//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { alwaysReturn as justReturn, combine } from 'fes'
import { authorize, getCurrentAndOtherPlayerData, sanitize } from '../helpers'
import { dal, removeCouchdbProperties } from 'server/db'
import { createIfRequestIsValid, ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('secretWord')

//
//------//
// Main //
//------//

function createPostInitPlayer({ router }) {
  router.post(
    '/:roomHash/player/:playerHash/secret-word',
    ifRequestIsValid(handlePostSecretWord)
  )
}

//
//------------------//
// Helper Functions //
//------------------//

function handlePostSecretWord(ctx) {
  const { body } = ctx.request,
    handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  body.secretWord = body.secretWord.toLowerCase().trim()

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([
          getCurrentAndOtherPlayerData,
          updateSecretWord,
          returnCurrentPlayer,
        ])
      )
    )
    .catch(handleError)
}

function updateSecretWord(result) {
  const { ctx, currentPlayer } = result,
    { secretWord } = ctx.request.body,
    { _id, _rev } = currentPlayer,
    updatedCurrentPlayer = removeCouchdbProperties(currentPlayer)

  updatedCurrentPlayer.secretWord = secretWord

  return dal.player.update(combine(updatedCurrentPlayer)({ _id, _rev })).then(
    justReturn({
      ctx,
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
    { secretWord } = ctx.request.body

  return {
    friendly: 'adding secret word',
    detailed: tedent(`
      error occurred during POST secret-word
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        secretWord: ${secretWord}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostInitPlayer

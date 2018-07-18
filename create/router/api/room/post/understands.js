//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { authorize, getCurrentPlayerData } from '../helpers'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { dal } from 'server/db'
import { createIfRequestIsValid, ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import { alwaysReturn as justReturn } from 'fes'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('understands')

//
//------//
// Main //
//------//

function createPostDisableGuide({ router }) {
  router.post(
    '/:roomHash/player/:playerHash/understands',
    ifRequestIsValid(getPlayerDataAndMarkAsUnderstood)
  )
}

//
//------------------//
// Helper Functions //
//------------------//

function getPlayerDataAndMarkAsUnderstood(ctx) {
  const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

  return authorize(ctx)
    .then(
      ifStatusIsNot404(
        promiseFlow([getCurrentPlayerData, updateGuide, returnResult])
      )
    )
    .catch(handleError)
}

function updateGuide({ ctx, currentPlayer }) {
  const { understands: understandsKey } = ctx.request.body,
    { encryptedEmail } = currentPlayer

  return dal.guide
    .get({ _id: encryptedEmail })
    .then(guideData => {
      guideData.understands[understandsKey] = true
      return dal.guide.update(guideData)
    })
    .then(justReturn({ ctx }))
}

function returnResult({ ctx }) {
  ctx.body = { result: 'successfully marked as understood' }
  ctx.status = 200
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params,
    { understands } = ctx.request.body

  return {
    friendly: "marking an aspect of the game as 'understood'",
    detailed: tedent(`
      error occurred during POST understands
        roomHash: ${roomHash}
        playerHash: ${playerHash}
        understands: ${understands}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostDisableGuide

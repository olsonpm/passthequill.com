//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import dedent from 'dedent'

import { dal, hashToDocid } from 'server/db'
import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { createIfRequestIsValid, ifResponseIsNot404 } from 'server/utils'
import { alwaysReturn as justReturn, containedIn, discard } from 'fes'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('emailUnsubscribe'),
  optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  }

//
//------//
// Main //
//------//

const createResubscribeRouter = () => createPostRoute(new KoaRouter())

//
//------------------//
// Helper Functions //
//------------------//

//
// Returns one of two success results
// {
//   result: 'already subscribed' | 'subscribed successfully'
// }
//
function createPostRoute(resubscribeRouter) {
  return resubscribeRouter.post(
    '/:emailSentHash',
    ifRequestIsValid(ctx => {
      const { emailSentHash } = ctx.params,
        { type } = ctx.request.body,
        errorArgs = [type, emailSentHash],
        handleError = handleErrorDuringRoute(ctx, createErrorMessage, errorArgs)

      try {
        const resubscribeToType = createResubscribeToType(ctx, type)

        return dal.emailSent
          .get({ _id: hashToDocid(emailSentHash) }, optionsForGet)
          .then(ifResponseIsNot404(ctx, resubscribeToType))
          .catch(handleError)
      } catch (error) {
        return handleError(error)
      }
    })
  )
}

function createResubscribeToType(ctx, type) {
  return ({ to: encryptedEmail }) =>
    dal.emailUnsubscription
      .get({ _id: encryptedEmail })
      .then(({ _id, _rev, types: unsubscribedTypes }) => {
        // remember we're subscribed if we're _not_ unsubscribed
        const isAlreadySubscribed = !containedIn(unsubscribedTypes)(type)

        if (isAlreadySubscribed) return { result: 'already subscribed' }

        const updatedTypes = discard(type)(unsubscribedTypes)
        return dal.emailUnsubscription
          .update({ _id, _rev, types: updatedTypes })
          .then(justReturn({ result: 'subscribed successfully' }))
      })
      .then(result => {
        ctx.status = 200
        ctx.body = result
      })
}

function createErrorMessage(type, emailSentHash) {
  return {
    friendly: 'attempting to update your unsubscribe settings',
    detailed: dedent(`
      error occurred during POST resubscribe
        hash: ${emailSentHash}
        type: ${type}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createResubscribeRouter

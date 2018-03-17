//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import dedent from 'dedent'

import unsubscribeViaEmailSentHash from './via-email-sent-hash'

import { validEmailTypes } from 'universal/email/types'
import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { createIfRequestIsValid } from 'server/utils'
import { join, passThrough } from 'fes'

//
//------//
// Init //
//------//

const createErrorMessage = getCreateErrorMessage(),
  ifRequestIsValid = createIfRequestIsValid('emailUnsubscribe'),
  //
  // each email sent has an associated type which the List-Unsubscribe header is
  //   bound to.
  //
  listOfApplicableTypes = join('|')(validEmailTypes.send)

//
//------//
// Main //
//------//

const createUnsubscribeRouter = () =>
  passThrough(new KoaRouter(), [createGetRoute, createPostRoute])

//
//------------------//
// Helper Functions //
//------------------//

//
// these non-restful 'GET' routes are for the List-Unsubscribe header
//
function createGetRoute(unsubscribeRouter) {
  return unsubscribeRouter.get(
    'list-unsubscribe',
    `/:emailType(${listOfApplicableTypes})/:emailSentHash`,
    ctx => {
      const { emailSentHash, emailType } = ctx.params,
        errorArgs = [emailType, emailSentHash]

      return unsubscribeViaEmailSentHash(emailSentHash, emailType)
        .then(result => {
          ctx.status = 200
          ctx.body = result
        })
        .catch(handleErrorDuringRoute(ctx, createErrorMessage.get, errorArgs))
    }
  )
}

//
// these more restful POST routes are called by the unsubscribe views
//   triggered by users clicking the unsubscribe email links
//
function createPostRoute(unsubscribeRouter) {
  return unsubscribeRouter.post(
    '/:emailSentHash',
    ifRequestIsValid(ctx => {
      const { emailSentHash } = ctx.params,
        { type } = ctx.request.body,
        errorArgs = [type, emailSentHash]

      return unsubscribeViaEmailSentHash(emailSentHash, type)
        .then(result => {
          ctx.status = 200
          ctx.body = result
        })
        .catch(handleErrorDuringRoute(ctx, createErrorMessage.post, errorArgs))
    })
  )
}

function getCreateErrorMessage() {
  const friendly = 'attempting to update your unsubscribe settings'

  return {
    get: (type, emailSentHash) => ({
      friendly,
      detailed: dedent(`
        error occurred during GET unsubscribe
          hash: ${emailSentHash}
          type: ${type}
      `),
    }),
    post: (type, emailSentHash) => ({
      friendly,
      detailed: dedent(`
        error occurred during POST unsubscribe
          hash: ${emailSentHash}
          type: ${type}
      `),
    }),
  }
}

//
//---------//
// Exports //
//---------//

export default createUnsubscribeRouter

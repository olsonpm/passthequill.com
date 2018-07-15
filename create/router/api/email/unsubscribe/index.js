//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import dedent from 'dedent'

import unsubscribeViaEmailSentHash from './via-email-sent-hash'

import { validEmailTypes } from 'universal/email/types'
import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { createIfRequestIsValid } from 'server/utils'
import { hashToDocid } from 'server/db'
import { join, passThrough } from 'fes'
import { logErrorToServer } from 'universal/utils'

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
// these non-restful route is for the List-Unsubscribe header
//
function createGetRoute(unsubscribeRouter) {
  return unsubscribeRouter.post(
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
// this more restful POST routes are called by the unsubscribe views triggered
//   by users clicking the unsubscribe confirmation button
//
function createPostRoute(unsubscribeRouter) {
  return unsubscribeRouter.post(
    '/:emailSentHash',
    ifRequestIsValid(ctx => {
      const { emailSentHash } = ctx.params,
        { type } = ctx.request.body,
        errorArgs = [type, emailSentHash]

      //
      // TODO: remove this code once the bug is solved - this check should
      //   be unnecessary
      //
      try {
        hashToDocid(emailSentHash)
      } catch (error) {
        ctx.status = 400
        ctx.body = {
          error: `Invalid emailSentHash was passed: ${emailSentHash}`,
        }
        logErrorToServer({
          error,
          context: 'during POST api/email/unsubscribe',
        })
        return
      }

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

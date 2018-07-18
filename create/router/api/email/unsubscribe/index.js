//---------//
// Imports //
//---------//

import cors from '@koa/cors'
import tedent from 'tedent'
import KoaRouter from 'koa-router'

import unsubscribeViaEmailSentHash from './via-email-sent-hash'

import { validEmailTypes } from 'universal/email/types'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
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
  passThrough(new KoaRouter(), [createListUnsubscribeRoute, createPostRoute])

//
//------------------//
// Helper Functions //
//------------------//

//
// these non-restful route is for the List-Unsubscribe header
//
function createListUnsubscribeRoute(unsubscribeRouter) {
  const nonRestfulUrl = `/:emailType(${listOfApplicableTypes})/:emailSentHash`

  return unsubscribeRouter.post(nonRestfulUrl, cors(), ctx => {
    const { emailSentHash, emailType } = ctx.params,
      handleError = createHandleErrorDuringRoute(
        ctx,
        createErrorMessage.nonRestful.post
      )

    try {
      return unsubscribeViaEmailSentHash(emailSentHash, emailType)
        .then(result => {
          ctx.status = 200
          ctx.body = result
        })
        .catch(handleError)
    } catch (error) {
      return handleError(error)
    }
  })
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
        handleError = createHandleErrorDuringRoute(ctx, createErrorMessage.post)

      try {
        return unsubscribeViaEmailSentHash(emailSentHash, type)
          .then(result => {
            ctx.status = 200
            ctx.body = result
          })
          .catch(handleError)
      } catch (error) {
        return handleError(error)
      }
    })
  )
}

function getCreateErrorMessage() {
  const friendly = 'attempting to update your unsubscribe settings'

  return {
    nonRestful: {
      post: ctx => {
        const { emailSentHash, emailSentType } = ctx.params

        return {
          friendly,
          detailed: tedent(`
            error occurred during non-restful POST unsubscribe
              hash: ${emailSentHash}
              emailSentType: ${emailSentType}
          `),
        }
      },
    },
    post: ctx => {
      const { emailSentHash } = ctx.params,
        { type } = ctx.request.body

      return {
        friendly,
        detailed: tedent(`
          error occurred during POST unsubscribe
            hash: ${emailSentHash}
            type: ${type}
        `),
      }
    },
  }
}

//
//---------//
// Exports //
//---------//

export default createUnsubscribeRouter

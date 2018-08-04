//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'
import KoaRouter from 'koa-router'

import { dal, hashToDocid } from 'server/db'
import { ifResponseIsNot404 } from 'server/utils'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'

//
//------//
// Init //
//------//

const optionsForGet = {
  allow404: true,
  returnRawResponse: true,
}

//
//------//
// Main //
//------//

const createUnsubscriptionsRouter = () => createGetRoute(new KoaRouter())

//
//------------------//
// Helper Functions //
//------------------//

function createGetRoute(unsubscriptionsRouter) {
  return unsubscriptionsRouter.get('/:emailSentHash', ctx => {
    const { emailSentHash } = ctx.params,
      handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

    try {
      const returnUnsubscriptions = createReturnUnsubscriptions(ctx)

      return Promise.resolve()
        .then(() =>
          dal.emailSent.get({ _id: hashToDocid(emailSentHash) }, optionsForGet)
        )
        .then(ifResponseIsNot404(ctx, returnUnsubscriptions))
        .catch(handleError)
    } catch (error) {
      return handleError(error)
    }
  })
}

function createReturnUnsubscriptions(ctx) {
  return ({ to: encryptedEmail }) => {
    const _id = couchdbBase64.encodeFromString(encryptedEmail)

    return dal.emailUnsubscription
      .get({ _id }, optionsForGet)
      .then(response => {
        const types = response.status === 404 ? [] : response.data.types

        ctx.status = 200
        ctx.body = { types }
        return
      })
  }
}

function createErrorMessage(ctx) {
  const { emailSentHash } = ctx.params

  return {
    friendly: 'attempting to retrieve unsubscribe settings',
    detailed: `error occurred during GET unsubscribe for the hash '${emailSentHash}'`,
  }
}

//
//---------//
// Exports //
//---------//

export default createUnsubscriptionsRouter

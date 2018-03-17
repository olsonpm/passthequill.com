//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'

import { dal, hashToDocid } from 'server/db'
import { ifResponseIsNot404 } from 'server/utils'
import { handleErrorDuringRoute } from 'project-root/create/router/api/helpers'

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
      returnUnsubscriptions = createReturnUnsubscriptions(ctx)

    return dal.emailSent
      .get({ _id: hashToDocid(emailSentHash) }, optionsForGet)
      .then(ifResponseIsNot404(ctx, returnUnsubscriptions))
      .catch(handleErrorDuringRoute(ctx, createErrorMessage, [emailSentHash]))
  })
}

function createReturnUnsubscriptions(ctx) {
  return ({ to: encryptedEmail }) => {
    return dal.emailUnsubscription
      .get({ _id: encryptedEmail }, optionsForGet)
      .then(response => {
        const types = response.status === 404 ? [] : response.data.types

        ctx.status = 200
        ctx.body = { types }
        return
      })
  }
}

function createErrorMessage(emailSentHash) {
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

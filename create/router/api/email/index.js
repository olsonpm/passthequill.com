//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'

import createResubscribeRouter from './resubscribe'
import createUnsubscribeRouter from './unsubscribe'
import createUnsubscriptionsRouter from './unsubscriptions'

//
//------//
// Main //
//------//

const createEmailRouter = () => {
  const emailRouter = new KoaRouter(),
    resubscribeRouter = createResubscribeRouter(),
    unsubscribeRouter = createUnsubscribeRouter(),
    unsubscriptionsRouter = createUnsubscriptionsRouter()

  emailRouter.use(
    '/resubscribe',
    resubscribeRouter.routes(),
    resubscribeRouter.allowedMethods()
  )

  //
  // The unsubscribe endpoint exists because we must use GET to unsubscribe from
  //   emails.  It is not restful and shouldn't be used from the app.  Without
  //   this restriction we
  //
  emailRouter.use(
    '/unsubscribe',
    unsubscribeRouter.routes(),
    unsubscribeRouter.allowedMethods()
  )

  return emailRouter.use(
    '/unsubscriptions',
    unsubscriptionsRouter.routes(),
    unsubscriptionsRouter.allowedMethods()
  )
}

//
//---------//
// Exports //
//---------//

export default createEmailRouter

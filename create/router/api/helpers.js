//---------//
// Imports //
//---------//

import log from 'server/log'
import dedent from 'dedent/macro'

//
//------//
// Main //
//------//

//
// It's worth noting that any errors reaching this function which aren't already
//   handled means there is a bug.  All async operations are in charge of
//   logging their own contextual errors and providing a friendly error message
//   for end users.  Granted even those errors are either bugs or people messing
//   with the api, but those are expected.
//
const handleErrorDuringRoute = (ctx, createErrorMessage, args) => error => {
  ctx.status = 500

  if (error.isHandled) {
    ctx.body = { error: error.friendlyMessage }
    return
  }

  const possiblyAsyncErrorMessage = createErrorMessage(...args)

  return Promise.resolve(possiblyAsyncErrorMessage).then(message => {
    message.detailed += '\n\n'
    message.detailed += dedent(`
      Note: This should be looked into because it means we missed handling an
            error somewhere.
    `)
    log.server.error(message.detailed, error)
    ctx.body = { error: `An error occurred while ${message.friendly}` }
  })
}

//
//---------//
// Exports //
//---------//

export { handleErrorDuringRoute }

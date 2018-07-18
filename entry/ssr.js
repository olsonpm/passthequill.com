//---------//
// Imports //
//---------//

import tedent from 'tedent'

import createApp from '../create/app'
import log from 'server/log'

import { first, invokeAt, passThrough } from 'fes'

//
//------//
// Main //
//------//

//
// context is provided by createBundleRenderer, whose internals I am not
//   familiar with
//
const initSsrApp = context => {
  return new Promise((resolve, reject) => {
    const { app, eventManager, router, store } = createApp()

    router.onReady(initApp)
    router.onError(reject)
    router.push(context.url)

    return

    // scoped helper functions

    //
    // this function is just a re-worded version of the code found here:
    // https://ssr.vuejs.org/en/data.html#server-data-fetching
    //
    function initApp() {
      const resolveAsyncData = passThrough(router, [
        invokeAt('getMatchedComponents'),
        first,
        matchedComponent => {
          if (matchedComponent.name === 'not-found') {
            store.commit('setShowNotFoundView', true)
            return Promise.resolve()
          }

          return matchedComponent.asyncData
            ? matchedComponent.asyncData({
                eventManager,
                store,
                route: router.currentRoute,
              })
            : Promise.resolve()
        },
      ])

      return resolveAsyncData
        .catch(error => {
          const leadingMessage = tedent(`
            occurred while resolving async data

            Note: This means we're missing an error handler in an asyncData
                  function and that should be fixed.  If the client hit this
                  error then the browser wouldn't have changed urls.
          `)
          log.server.error(leadingMessage, error)
          store.commit('setShowErrorView', true)
        })
        .then(() => {
          //
          // the documentation found in the link above explains a little bit,
          //   but `context.state` is directly used here:
          //   https://ssr.vuejs.org/en/api.html#renderer-options
          //
          context.state = store.state

          context.httpStatusCode = 200
          if (store.state.showNotFoundView) context.httpStatusCode = 404
          else if (store.state.showErrorView) context.httpStatusCode = 500
          resolve(app)
        })
        .catch(reject)
    }
  })
}

//
//---------//
// Exports //
//---------//

export default initSsrApp

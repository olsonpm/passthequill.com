//---------//
// Imports //
//---------//

import focusWithin from 'focus-within'
import promisePrototypeFinally from 'promise.prototype.finally'

import createApp from 'project-root/create/app'
import initWebsocket from './init-websocket'

import { initialize } from 'sourcemapped-stacktrace'
import { auto as polyfillUnhandledRejection } from 'browser-unhandled-rejection'
import { logErrorToServer } from 'universal/utils'
import { logError } from 'universal/utils'
import { discardFirstWhile, first, passThrough } from 'fes'

//
//------//
// Init //
//------//

promisePrototypeFinally.shim()

const isDevelopment = process.env.NODE_ENV === 'development'

polyfillUnhandledRejection()

logUnhandledErrorsAndRejections()

initialize({
  ignoreWarning: isDevelopment,
  urlToMappingsWasm: '/mappings.wasm',
})

focusWithin(document)

if (isDevelopment) initWebsocket.debug()

//
//------//
// Main //
//------//

const { app, eventManager, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(routerIsReady, logError)

//
//------------------//
// Helper Functions //
//------------------//

function routerIsReady() {
  router.beforeResolve(onBeforeResolve)
  app.$mount('#app')
}

//
// This code is essentially copied from method 1 shown here:
//   https://ssr.vuejs.org/en/data.html#client-data-fetching
//

function onBeforeResolve(to, from, next) {
  const matched = router.getMatchedComponents(to),
    previouslyMatched = router.getMatchedComponents(from)

  const resolveAsyncData = passThrough(matched, [
    //
    // NOTE: I don't understand why they use this logic in the
    //   documentation above
    //
    discardFirstWhile(isSameAsPreviouslyMatched),
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
            route: to,
          })
        : Promise.resolve()
    },
  ])

  resolveAsyncData.then(next).catch(error => {
    store.commit('setShowErrorView', true)
    return logErrorToServer({
      context: 'resolving async data',
      error,
    }).then(() => next())
  })

  return

  // scoped helper functinos

  function isSameAsPreviouslyMatched(matchedComponent, index) {
    return matchedComponent === previouslyMatched[index]
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function logUnhandledErrorsAndRejections() {
  window.addEventListener('unhandledrejection', promiseRejectionEvent => {
    try {
      let error = promiseRejectionEvent.reason,
        ignoreStack = false

      if (!(error instanceof Error)) {
        error = new Error(error)
        ignoreStack = true
      }

      logErrorToServer({
        context: '- unhandled rejection event',
        error,
        ignoreStack,
      })
    } catch (_unused_error) {
      // prevent a possible infinite loop caused by:
      //   unhandled rejection
      //   -> unhandled error
      //   -> unhandled rejection
      //   -> ...
    }
  })

  window.addEventListener('error', errorEvent => {
    try {
      let error = errorEvent.error,
        ignoreStack = false

      if (!(error instanceof Error)) {
        error = new Error(errorEvent.message || '(no message)')
        ignoreStack = true
      }

      logErrorToServer({
        error,
        context: '- unhandled error event',
        ignoreStack,
      })
    } catch (_unused_error) {
      // don't cause an infinite loop
    }
  })
}

//---------//
// Imports //
//---------//

import focusWithin from 'focus-within'

import { initialize } from 'sourcemapped-stacktrace'

import createApp from 'project-root/create/app'

import { logError } from 'project-root/lib/universal/utils'
import { discardFirstWhile, first, passThrough } from 'fes'

import initWebsocket from './init-websocket'

//
//------//
// Init //
//------//

initialize({ urlToMappingsWasm: '/mappings.wasm' })

focusWithin(document)

if (process.env.NODE_ENV === 'development') initWebsocket.debug()

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

  resolveAsyncData.then(next).catch(() => {
    // TODO: provide server endpoint to send the error for logging
    store.commit('setShowErrorView', true)
    return next()
  })

  return

  // scoped helper functinos

  function isSameAsPreviouslyMatched(matchedComponent, index) {
    return matchedComponent === previouslyMatched[index]
  }
}

//---------//
// Imports //
//---------//

import Vue from 'vue'
import { sync } from 'vuex-router-sync'

// TODO: find better name than 'app'.  It conflicts below
import app from './index.vue'
import createEventManager from '../event-manager'
import createStore from '../store'
import createVueRouter from '../router/vue'
import eventManagerPlugin from '../../lib/vue-plugins/event-manager'
import myStorePlugin from '../../lib/vue-plugins/my-store'
import globalComponents from 'project-root/component/global'

import { noop } from 'universal/utils'
import { authorEmail } from 'project-root/config/app'
import { forEach, isEmpty, isLaden } from 'fes'

//
//------//
// Init //
//------//

const registerAll = forEach(register)

exposeGlobalProperties()
registerAll(globalComponents)

Vue.use(eventManagerPlugin)
Vue.use(myStorePlugin)

//
//------//
// Main //
//------//

const createApp = () => {
  const store = createStore(),
    router = createAndInitVueRouter(store),
    eventManager = createEventManager()

  sync(store, router)

  const vueApp = new Vue({
    router,
    render: createElement => createElement(app),
    store,
    eventManager,
  })

  return {
    app: vueApp,
    eventManager,
    router,
    store,
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createAndInitVueRouter(store) {
  const router = createVueRouter()

  router.beforeEach((_unused_to, _unused_from, next) => {
    //
    // Ideally there'd be a global 'leave' hook to mirror the per-component
    //   `beforeRouteLeave`.  `beforeEach` is the next best thing.
    //
    // We need to set this in a global hook because every component may have an
    //   error view
    //
    if (store.state.showErrorView) store.commit('setShowErrorView', false)
    next()
  })

  return router
}

function register(aComponent) {
  Vue.component(aComponent.name, aComponent)
}

function exposeGlobalProperties() {
  Vue.prototype.global = {
    authorEmail,
    isEmpty,
    isLaden,
    noop,
    range: (min, max) => {
      const result = []
      for (let i = min; i <= max; i += 1) {
        result.push(i)
      }
      return result
    },
    url: {
      github: 'https://github.com/olsonpm/passthequill.com',
    },
  }
}

//
//---------//
// Exports //
//---------//

export default createApp

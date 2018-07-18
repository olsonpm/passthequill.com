//---------//
// Imports //
//---------//

import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import { mRemoveAtIndex } from 'universal/utils'

//
//------//
// Init //
//------//

//
// woo woo side-effects!  woo woo global state!  x.x
//
Vue.use(Vuex)

//
//------//
// Main //
//------//

const createStore = () =>
  new Vuex.Store({
    modules,
    state: () => ({
      appClasses: [],
      showErrorView: false,
      showNotFoundView: false,
    }),
    mutations: {
      addAppClass(state, appClass) {
        state.appClasses.push(appClass)
      },
      removeAppClass(state, index) {
        mRemoveAtIndex(index)(state.appClasses)
      },
      setShowErrorView(state, value) {
        state.showErrorView = value
      },
      setShowNotFoundView(state, value) {
        state.showNotFoundView = value
      },
    },
  })

//
//---------//
// Exports //
//---------//

export default createStore

//
// TODO: figure out a clean way to expose componentName and content - right now
//       it feels dirty.
//
// TODO: don't leave it up to the consumer to setIsAnimating appropriately.
//   This module should publish an event and when that event is finished this
//   should setIsAnimating to false
//

//---------//
// Imports //
//---------//

import { assignOver } from 'fes'

//------//
// Init //
//------//

const applyDefaults = assignOver(getInitialState())

//
//------//
// Main //
//------//

const lightbox = {
  state: getInitialState,
  actions: {
    tryToShow({ commit, state }, arg) {
      const { componentName, content, type } = applyDefaults(arg)

      if (!state.isAnimating && !state.show) {
        commit('setShow', true)
        commit('setComponentName', componentName)
        commit('setContent', content)
        commit('setIsAnimating', true)
        commit('setType', type)
      }
    },
    tryToHide({ commit, state }) {
      if (state.show && !state.isAnimating) {
        commit('setIsAnimating', true)
        commit('setShow', false)
      }
    },
  },
  mutations: {
    setComponentName(state, componentName) {
      state.componentName = componentName
    },
    setContent(state, content) {
      state.content = content
    },
    setIsAnimating(state, trueOrFalse) {
      state.isAnimating = trueOrFalse
    },
    setShow(state, trueOrFalse) {
      state.show = trueOrFalse
    },
    setType(state, type) {
      state.type = type
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getInitialState() {
  return {
    isAnimating: false,
    componentName: 'default-lightbox',
    content: '',
    show: false,
    type: null,
  }
}

//
//---------//
// Exports //
//---------//

export default lightbox

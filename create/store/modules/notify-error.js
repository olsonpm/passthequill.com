//------//
// Main //
//------//

const notifyError = {
  state: () => ({
    html: '',
    isActive: false,
    isAnimating: false,
  }),
  actions: {
    tryToShow({ commit, state }, { html }) {
      if (!state.isActive) {
        commit('setHtml', html)
        commit('setIsActive', true)
        commit('setIsAnimating', true)
      }
      return Promise.resolve()
    },
  },
  mutations: {
    setHtml(state, html) {
      state.html = html
    },
    setIsActive(state, trueOrFalse) {
      state.isActive = trueOrFalse
    },
    setIsAnimating(state, trueOrFalse) {
      state.isAnimating = trueOrFalse
    },
  },
}

//
//---------//
// Exports //
//---------//

export default notifyError

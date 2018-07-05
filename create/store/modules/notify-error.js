//------//
// Main //
//------//

const notifyError = {
  state: () => ({
    html: '',
    isActive: false,
    isAnimating: false,
    isShowing: false,
  }),
  actions: {
    tryToShow({ commit, dispatch, state }, { eventManager, html }) {
      if (state.isShowing) return
      else commit('setIsShowing', true)

      const maybeHide = state.isActive
        ? dispatch('tryToHide', { eventManager })
        : Promise.resolve()

      return maybeHide
        .then(() => {
          commit('setHtml', html)
          commit('setIsActive', true)
          commit('setIsAnimating', true)
          return eventManager.publish('notifyError/show')
        })
        .then(() => {
          commit('setIsAnimating', false)
          commit('setIsShowing', false)
        })
    },
    tryToHide({ commit, state }, { eventManager }) {
      if (!state.isActive) return Promise.resolve()

      commit('setIsAnimating', true)
      return eventManager.publish('notifyError/hide').then(() => {
        commit('setIsActive', false)
        commit('setIsAnimating', false)
      })
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
    setIsShowing(state, trueOrFalse) {
      state.isShowing = trueOrFalse
    },
  },
}

//
//---------//
// Exports //
//---------//

export default notifyError

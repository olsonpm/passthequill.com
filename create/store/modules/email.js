//---------//
// Imports //
//---------//

import api from 'universal/api'

import { setShowNotFoundOrErrorView } from 'universal/utils'
import { validEmailTypes } from 'universal/email/types'
import { assignOver, mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const initialUnsubscribedFrom = getInitialUnsubscribedFrom()

//
//------//
// Main //
//------//

const email = {
  state: getInitialState,
  actions: {
    getUnsubscriptions({ commit }, { route }) {
      const { emailSentHash } = route.params

      return api
        .get(`/email/unsubscriptions/${emailSentHash}`)
        .then(result => commit('setUnsubscriptions', result.types))
        .catch(setShowNotFoundOrErrorView(commit))
    },
    unsubscribe({ commit }, { emailSentHash, type }) {
      commit('unsubscribeFrom', type)
      return api
        .post(`/email/unsubscribe/${emailSentHash}`, { type })
        .catch(setShowNotFoundOrErrorView(commit))
    },
    resubscribe({ commit }, { emailSentHash, type }) {
      commit('resubscribeTo', type)

      return api
        .post(`/email/resubscribe/${emailSentHash}`, { type })
        .catch(setShowNotFoundOrErrorView(commit))
    },
  },
  mutations: {
    resubscribeTo(state, type) {
      state.unsubscribedFrom[type] = false
    },
    setUnsubscriptions(state, types) {
      //
      // vue doesn't support es6 sets so an object with properties set to true
      //   is good'nuff
      //
      const unsubscribed = reduce(allToTrue, {})(types)
      state.unsubscribedFrom = assignOver(initialUnsubscribedFrom)(unsubscribed)
    },
    unsubscribeFrom(state, type) {
      state.unsubscribedFrom[type] = true
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function allToTrue(typeToStatus, type) {
  return mSet(type, true)(typeToStatus)
}

function allToFalse(typeToStatus, type) {
  return mSet(type, false)(typeToStatus)
}

function getInitialState() {
  return {
    unsubscribedFrom: getInitialUnsubscribedFrom(),
  }
}

function getInitialUnsubscribedFrom() {
  return reduce(allToFalse, {})(validEmailTypes.unsubscribe)
}

//
//---------//
// Exports //
//---------//

export default email

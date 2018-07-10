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
    getUnsubscriptions({ commit, rootState }) {
      const { emailSentHash } = rootState.route.params

      return api
        .get(`/email/unsubscriptions/${emailSentHash}`)
        .then(result => commit('setUnsubscriptions', result.types))
        .catch(setShowNotFoundOrErrorView(commit))
    },
    unsubscribe({ commit }, { route }) {
      const { emailSentHash, type } = route.params

      commit('unsubscribeFrom', type)
      return api
        .post(`/email/unsubscribe/${emailSentHash}`, { type })
        .then(({ result }) => {
          commit('setUnsubscribeResult', { type, result })
        })
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
    setUnsubscribeResult(state, { type, result }) {
      state.unsubscribeResult[type] = result
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
    unsubscribeResult: getInitialUnsubscribeResult(),
    unsubscribedFrom: getInitialUnsubscribedFrom(),
  }
}

function getInitialUnsubscribedFrom() {
  return reduce(allToFalse, {})(validEmailTypes.unsubscribe)
}

function getInitialUnsubscribeResult() {
  return reduce(setToEmptyString, {})(validEmailTypes.unsubscribe)
}

function setToEmptyString(typeToInitialState, type) {
  return mSet(type, '')(typeToInitialState)
}

//
//---------//
// Exports //
//---------//

export default email

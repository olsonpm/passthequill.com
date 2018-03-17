//---------//
// Imports //
//---------//

import api from 'client/api'

import { mSet, reduce } from 'fes'
import { validEmailTypes } from 'universal/email/types'

//
//------//
// Init //
//------//

const typeToUnsubscribe = createTypeToUnsubscribe()

//
//------//
// Main //
//------//

const unsubscribe = (emailSentHash, type) =>
  typeToUnsubscribe[type](emailSentHash)

//
//------------------//
// Helper Functions //
//------------------//

function createTypeToUnsubscribe() {
  return reduce(toUnsubscribePerType, {})(validEmailTypes.unsubscribe)
}

function toUnsubscribePerType(typeToUnsubscribe, type) {
  return mSet(type, unsubscribeApiCall)(typeToUnsubscribe)

  function unsubscribeApiCall(emailSentHash) {
    return api.post(`email/unsubscribe/${emailSentHash}`, { type })
  }
}

//
//---------//
// Exports //
//---------//

export default unsubscribe

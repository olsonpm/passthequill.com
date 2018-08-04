//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'

import { createHandleServerError } from 'server/utils'
import { dal } from 'server/db'
import { validEmailTypes } from 'universal/email/types'
import { alwaysReturn as justReturn, mAppend, mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  },
  typeToUnsubscribe = createTypeToUnsubscribe()

//
//------//
// Main //
//------//

//
// Returns one of two success results
// {
//   result: 'already unsubscribed' | 'unsubscribed successfully'
// }
//

const unsubscribe = (encryptedEmail, emailType) =>
  typeToUnsubscribe[emailType](encryptedEmail)

//
//------------------//
// Helper Functions //
//------------------//

function createTypeToUnsubscribe() {
  return reduce(toUnsubscribeFunctions, {})(validEmailTypes.unsubscribe)
}

function toUnsubscribeFunctions(typeToFunction, type) {
  return mSet(type, unsubscribeFromType)(typeToFunction)

  function unsubscribeFromType(encryptedEmail) {
    const _id = couchdbBase64.encodeFromString(encryptedEmail)

    return dal.emailUnsubscription
      .get({ _id }, optionsForGet)
      .then(response => {
        if (response.status === 404) {
          return dal.emailUnsubscription
            .create({ _id, types: [type] })
            .then(justReturn({ result: 'unsubscribed successfully' }))
        } else {
          // not 404
          const { types: currentTypes } = response.data,
            setOfCurrentTypes = new Set(currentTypes)

          if (setOfCurrentTypes.has(type))
            return { result: 'already unsubscribed' }

          const { _rev } = response.data
          return dal.emailUnsubscription
            .update({
              _rev,
              _id,
              types: mAppend(type)(currentTypes),
            })
            .then(justReturn({ result: 'unsubscribed successfully' }))
        }
      })
      .catch(createHandleServerError(createErrorMessage, [encryptedEmail]))
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createErrorMessage(encryptedEmail) {
  return {
    friendly: 'unsubscribing your email',
    detailed: `error creating or retrieving the emailUnsubscription with the encrypted email '${encryptedEmail}'`,
  }
}

//
//---------//
// Exports //
//---------//

export default unsubscribe

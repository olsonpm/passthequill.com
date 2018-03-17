//---------//
// Imports //
//---------//

import {
  combine,
  getValueAt,
  omitAll,
  returnFirstArgument as identity,
} from 'fes'

//
//------//
// Init //
//------//

const possibleCustomOptions = new Set(['allow404', 'returnRawResponse']),
  allow404 = status => {
    return (status >= 200 && status < 300) || status === 404
  }

//
//------//
// Main //
//------//

const getAxiosOptions = (options = {}) => {
  const derivedAxiosOptions = deriveAxiosOptions(options),
    axiosOptions = omitAll(possibleCustomOptions)(options)

  return combine(axiosOptions)(derivedAxiosOptions)
}

const getResponseTransform = (options = {}) => {
  return options.returnRawResponse ? identity : returnData
}

const returnData = getValueAt('data')

//
//------------------//
// Helper Functions //
//------------------//

function deriveAxiosOptions(options) {
  return options.allow404 ? { validateStatus: allow404 } : {}
}

//
//---------//
// Exports //
//---------//

export { getAxiosOptions, getResponseTransform, returnData }

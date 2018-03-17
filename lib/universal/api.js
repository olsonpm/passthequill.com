//---------//
// Imports //
//---------//

import axios from 'axios'

import { mSet, reduce } from 'fes'

import { getAxiosOptions, getResponseTransform } from './axios-helpers'

//
//------//
// Init //
//------//

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL + 'api/',
  }),
  methodsWithData = new Set(['post', 'put'])

//
//------//
// Main //
//------//

const api = reduce(toApi, {})(['delete', 'get', 'post', 'put'])

//
//------------------//
// Helper Functions //
//------------------//

function toApi(methodToApiCall, method) {
  const apiCall = methodsWithData.has(method)
    ? apiCall_With_Data
    : apiCall_Without_Data

  return mSet(method, apiCall)(methodToApiCall)

  //
  // async because if a synchronous error occurs then it will be rejected
  //   instead of thrown
  //
  function apiCall_With_Data(url, data, options) {
    try {
      const axiosOptions = getAxiosOptions(options),
        maybeTransformResult = getResponseTransform(options)

      return axiosInstance[method](url, data, axiosOptions).then(
        maybeTransformResult
      )
    } catch (e) {
      return Promise.reject(e)
    }
  }
  function apiCall_Without_Data(url, options) {
    try {
      const axiosOptions = getAxiosOptions(options),
        maybeTransformResult = getResponseTransform(options)

      return axiosInstance[method](url, axiosOptions).then(maybeTransformResult)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

//
//---------//
// Exports //
//---------//

export default api

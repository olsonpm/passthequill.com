//---------//
// Imports //
//---------//

import { map, mMap, mSet, passThrough, reduce } from 'fes'

//
//------//
// Main //
//------//

function resolveAllProperties(anObject) {
  return passThrough(anObject, [
    toPairs,
    mMap(resolveAll),
    resolveAll,
    then(fromPairs),
  ])
}

function resolveAll(anArray) {
  return Promise.all(anArray)
}

function settleAll(arrayOfPromises) {
  return passThrough(arrayOfPromises, [map(settle), resolveAll])
}

function then(callThis) {
  return aPromise => aPromise.then.call(aPromise, callThis)
}

//
//------------------//
// Helper Functions //
//------------------//

function fromPairs(anArray) {
  return reduce((res, [key, val]) => mSet(key, val)(res), {})(anArray)
}

function toPairs(obj) {
  return mMap(aKey => [aKey, obj[aKey]])(Object.keys(obj))
}

function settle(aPromise) {
  return aPromise.then(
    successVal => ({ value: successVal, status: 'resolve' }),
    err => ({ value: err, status: 'reject' })
  )
}

//
//---------//
// Exports //
//---------//

export { resolveAll, resolveAllProperties, settleAll, then }

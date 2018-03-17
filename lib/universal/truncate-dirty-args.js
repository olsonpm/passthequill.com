//---------//
// Imports //
//---------//

import typeDetect from 'type-detect'

import jstring from './jstring'
import {
  append,
  flow,
  getArrayOfValues,
  getCount,
  join,
  keepFirst,
  mMap,
  passThrough,
  returnFirstArgument as identity,
  truncateToNLines,
} from 'fes'

//
//------//
// Main //
//------//

//
// the term 'dirty' means either invalid or not yet validated.  It is the reason
//   we need to truncate the values because otherwise we would have known data
//   and thus be able to format it nicely.
//
// this method handles a few types of 'args'
//   1. an array of arguments (array-like)
//   2. an 'arguments' object (array-like)
//   3. an object representing the arguments to a function which only takes a
//      single argument object (named as opposed to numeric key-value pairs).
//      I often use this convention to simplify input validation
//
const truncateDirtyArgs = args => {
  const isObject = typeDetect(args) === 'Object',
    [take3, toArray] = isObject
      ? [take3_object, getArrayOfValues]
      : [keepFirst(3), identity]

  return passThrough(args, [
    take3,
    mMap(flow([jstring, truncateToNLines(3)])),
    mMap((aString, key) => `${key}: ${aString}`),
    toArray,
    join('\n\n'),
    maybeAddMoreIndicator(getCount(args)),
  ])
}

//
//------------------//
// Helper Functions //
//------------------//

function take3_object(anObject) {
  const keys = Object.keys(anObject)
  if (keys.length <= 3) return anObject

  const result = {}
  for (let i = 0; i < 3; i += 1) {
    const currentKey = keys[i]
    result[currentKey] = anObject[currentKey]
  }
  return result
}

function maybeAddMoreIndicator(numArguments) {
  return truncatedArgs => {
    return numArguments > 3
      ? append(`\n...(${numArguments - 3} more)`)(truncatedArgs)
      : truncatedArgs
  }
}

//
//---------//
// Exports //
//---------//

export default truncateDirtyArgs

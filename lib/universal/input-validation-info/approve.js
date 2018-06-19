//
// README
//  - This code looks a little awkward due to the api it exposes.  This code
//    would look less weird if approveEach took an array of function and
//    argument pairs, but the api that exposes is less friendly.  For example
//    approveEach is currently used like:
//
//    approveEach([
//      ladenString(),
//      maxLength(500)
//    ])
//
//    which reads nice'lier than
//
//    approveEach([
//      [ladenString],
//      [maxLength, [500]]
//    ])
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { truncate } from 'universal/utils'

import {
  containedIn as fes_containedIn,
  contains,
  findFirstWhen,
  invoke,
  join,
} from 'fes'

//
//------//
// Main //
//------//

const approveEach = arrayOfApprovals => {
  //
  // each approval is ready to lazily call.  No arguments are needed.  If an
  //   error message is returned then the remaining approvals are not executed
  //
  return findFirstWhen(invoke)(arrayOfApprovals)
}

//
// see above README to understand why each approval function returns a
//   wrapper function
//
const createApprover = ({ fieldName, value }) => {
  return {
    containedIn,
    doesNotContain,
    isLowerCase,
    ladenString,
    maxLength,
    noDuplicateLetters,
  }

  // scoped helper functions

  function containedIn(setOfValues) {
    return () => {
      if (!fes_containedIn(setOfValues)(value)) {
        return dedent(`
          ${fieldName} must be one of the available values

          available values: ${join(', ')(setOfValues)}
          value given: ${truncate(value)}
        `)
      }
    }
  }

  function doesNotContain(aString) {
    return () => {
      if (contains(aString)(value)) {
        return dedent(`
          ${fieldName} cannot contain newlines
          value: ${truncate(value)}
        `)
      }
    }
  }

  function isLowerCase() {
    return () => {
      if (value !== value.toLowerCase()) {
        return dedent(`
          ${fieldName} must be lowercase
          value: ${truncate(value)}
        `)
      }
    }
  }

  function ladenString() {
    return () => isLadenString(fieldName)(value)
  }

  function maxLength(max) {
    return () => {
      if (value.length > max) {
        return dedent(`
          ${fieldName} cannot be greater than ${max} characters
          max length: ${max}
          value.length: ${value.length}
          value: ${truncate(value)}
        `)
      }
    }
  }

  function noDuplicateLetters() {
    return () => {
      if (new Set(value).size !== value.length) {
        return dedent(`
          ${fieldName} cannot have duplicate letters
          string passed: ${value}
        `)
      }
    }
  }
}

const isLadenString = fieldName => value => {
  if (typeof value !== 'string' || !value) {
    return dedent(`
      ${fieldName} must be a non-empty string
      typeof value: ${typeof value}
      value: ${truncate(value)}
    `)
  }
}

//
//---------//
// Exports //
//---------//

export { approveEach, createApprover, isLadenString }

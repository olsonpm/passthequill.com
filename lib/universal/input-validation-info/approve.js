//---------//
// Imports //
//---------//

import dedent from 'dedent'

import setOfValidWords from '../set-of-valid-words'

import { truncate } from '../utils'

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
    hasLength,
    isLadenString,
    isValidWord,
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

  function hasLength(n) {
    return () => {
      if (value.length !== n) {
        return dedent(`
          ${fieldName} must have ${n} characters
          value.length: ${value.length}
          value: ${truncate(value)}
        `)
      }
    }
  }

  function isValidWord() {
    if (!setOfValidWords.has(value)) {
      return dedent(`
        ${fieldName} must be a valid word
        value: ${truncate(value)}
      `)
    }
  }

  function isLadenString() {
    return helper_isLadenString(fieldName)(value)
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
    if (new Set(value).size !== value.length) {
      return dedent(`
        ${fieldName} cannot have duplicate letters
        string passed: ${value}
      `)
    }
  }
}

const isLadenString = helper_isLadenString

//
//------------------//
// Helper Functions //
//------------------//

function helper_isLadenString(fieldName) {
  return value => {
    if (typeof value !== 'string' || !value) {
      return dedent(`
        ${fieldName} must be a non-empty string
        typeof value: ${typeof value}
        value: ${truncate(value)}
      `)
    }
  }
}

//
//---------//
// Exports //
//---------//

export { approveEach, createApprover, isLadenString }

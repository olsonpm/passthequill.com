//---------//
// Imports //
//---------//

import tedent from 'tedent'

import jstring from './jstring'
import truncateDirtyArgs from './truncate-dirty-args'

import { discardAll, isLaden, join } from 'fes'

//
//------//
// Main //
//------//

//
// Validates
//   1. a single argument was passed
//   2. the single argument is an object
//   3. the object only has the expected arguments
//   4. the object is not missing any arguments
//
const createApproveSimpleInput = context => {
  const createError = message => new Error(`Error while ${context}\n${message}`)

  return function approveSimpleInput(arrayOfArguments, requiredProperties) {
    if (arrayOfArguments.length !== 1) {
      const firstThree = arrayOfArguments.length > 3 ? 'first three ' : '',
        truncatedArguments = truncateDirtyArgs(arrayOfArguments)

      return createError(
        tedent(`
          This method requires a single object argument
          number of arguments passed: ${arrayOfArguments.length}
          ${firstThree}arguments passed: ${truncatedArguments}
        `)
      )
    }

    const input = arrayOfArguments[0]

    if (input === null || typeof input !== 'object') {
      return createError(
        tedent(`
          Input must be an object
          input passed: ${jstring(input)}
        `)
      )
    }

    const passedKeys = Object.keys(input),
      unexpectedProperties = discardAll(requiredProperties)(passedKeys)
    if (isLaden(unexpectedProperties)) {
      return createError(
        tedent(`
          The following unexpected properties were passed:
          ${join(', ')(unexpectedProperties)}
        `)
      )
    }

    const missingProperties = discardAll(passedKeys)(requiredProperties)
    if (isLaden(missingProperties)) {
      return createError(
        `The following properties are missing: ${join(', ')(missingProperties)}`
      )
    }
  }
}

//
//---------//
// Exports //
//---------//

export default createApproveSimpleInput

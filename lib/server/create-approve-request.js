//
// README
//   - Because we're stuck with an unfortunate side-effect'ful web server api,
//     this function sets ctx's status and body properties as well as returns
//     whether the request body was valid.
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { truncateDirtyArgs } from '../universal/utils'
import {
  discardAll,
  getArrayOfKeys,
  getArrayOfValues,
  getCount,
  getValueAt,
  isLaden,
  isTruthy,
  join,
  keepWhen,
  map,
  omitAll,
  passThrough,
  pickAllFrom,
} from 'fes'

//
//------//
// Init //
//------//

const propertyIsTruthy = getValueAt

//
//------//
// Main //
//------//

//
// requestValidationInfo has the shape
// {
//   body: inputIdToValidationInfo,
//   queryParameters: inputIdToValidationInfo
// }
//
// inputIdToValidationInfo has the shape
// {
//   <input id>: {
//     approve: value => string (error message) | undefined
//     isRequired: <boolean>
//   }
//   <input id>: ...
// }
//
const createApproveRequest = requestValidationInfo => {
  const allAllowedKeys = map(getArrayOfKeys)(requestValidationInfo),
    allRequiredKeys = map(toRequiredKeys)(requestValidationInfo),
    allApprovers = map(toApproveFunction)(requestValidationInfo)

  return function validateRequest(ctx) {
    const dirty = {
        body: ctx.request.body,
        queryParameters: ctx.query,
      },
      errorMessage = passThrough(
        [approve('body'), approve('queryParameters')],
        [keepWhen(isTruthy), join('\n\n')]
      )

    return errorMessage

    // helper functions scoped to 'validateRequestBody'

    function approve(bodyOrQueryParameters) {
      const allowedKeys = allAllowedKeys[bodyOrQueryParameters],
        requiredKeys = allRequiredKeys[bodyOrQueryParameters],
        idToApprove = allApprovers[bodyOrQueryParameters],
        propertiesPassed = dirty[bodyOrQueryParameters]

      return (
        approveExpectedProperties(allowedKeys, propertiesPassed) ||
        approveRequiredProperties(requiredKeys, propertiesPassed) ||
        approveValidProperties(idToApprove, propertiesPassed)
      )
    }

    function approveExpectedProperties(allowedKeys, propertiesPassed) {
      const unexpectedProperties = omitAll(allowedKeys)(propertiesPassed),
        numberOfUnexpectedProperties = getCount(unexpectedProperties)

      if (numberOfUnexpectedProperties > 0) {
        const unexpectedPropsString = truncateDirtyArgs(unexpectedProperties)
        return dedent(`
          Unexpected properties were passed
          expected keys: ${join(', ')(allowedKeys)}
          unexpected props passed: ${unexpectedPropsString}
        `)
      }
    }

    function approveRequiredProperties(requiredKeys, propertiesPassed) {
      const passedKeys = Object.keys(propertiesPassed),
        missingKeys = discardAll(passedKeys)(requiredKeys)

      if (isLaden(missingKeys)) {
        return `You are missing the following keys: ${join(', ')(missingKeys)}`
      }
    }

    function approveValidProperties(idToApprove, propertiesPassed) {
      const invalidIdToReason = passThrough(propertiesPassed, [
          map((value, key) => idToApprove[key](value)),
          keepWhen(isLaden),
        ]),
        numberOfInvalidProperties = getCount(invalidIdToReason)

      if (numberOfInvalidProperties > 0) {
        const invalidProps = passThrough(invalidIdToReason, [
            getArrayOfKeys,
            pickAllFrom(propertiesPassed),
            truncateDirtyArgs,
          ]),
          reasons = passThrough(invalidIdToReason, [
            map((value, key) => `${key}: ${value}`),
            getArrayOfValues,
            join('\n\n'),
          ])

        return dedent(`
          Invalid properties were passed:
          ${invalidProps}

          reasons:
          ${reasons}
        `)
      }
    }
  }
}

function toApproveFunction(inputIdToValidationInfo) {
  return map(getValueAt('approve'))(inputIdToValidationInfo)
}

function toRequiredKeys(inputIdToValidationInfo) {
  return passThrough(inputIdToValidationInfo, [
    keepWhen(propertyIsTruthy('isRequired')),
    getArrayOfKeys,
  ])
}

//
//---------//
// Exports //
//---------//

export default createApproveRequest

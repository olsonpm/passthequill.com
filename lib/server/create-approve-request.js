//
// README
//   - Because we're stuck with an unfortunate side-effect'ful web server api,
//     this function sets ctx's status and body properties as well as returns
//     whether the request body was valid.
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { truncateDirtyArgs } from '../universal/utils'
import {
  discardAll,
  findFirstWhen,
  getArrayOfKeys,
  getArrayOfValues,
  getCount,
  getValueAt,
  isLaden,
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
// validationInfo has the shape
// {
//   approve: value => string (error message) | undefined
//   isRequired: <boolean>
// }
//
const createApproveRequest = inputIdToValidationInfo => {
  return function approveRequest(ctx) {
    const requestIsUnapproved = createRequestIsUnapproved(
      inputIdToValidationInfo,
      ctx
    )

    return findFirstWhen(requestIsUnapproved)([
      approveExpectedProperties,
      approveRequiredProperties,
      approveValidProperties,
    ])
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createRequestIsUnapproved(inputIdToValidationInfo, ctx) {
  return function requestIsUnapproved(approveFunction) {
    return approveFunction(inputIdToValidationInfo, ctx.request.body)
  }
}

function approveExpectedProperties(inputIdToValidationInfo, requestBody) {
  const allowedKeys = Object.keys(inputIdToValidationInfo),
    unexpectedProperties = omitAll(allowedKeys)(requestBody),
    numberOfUnexpectedProperties = getCount(unexpectedProperties)

  if (numberOfUnexpectedProperties > 0) {
    const unexpectedPropsString = truncateDirtyArgs(unexpectedProperties)
    return tedent(`
      Unexpected properties were passed
      expected keys: ${join(', ')(allowedKeys)}
      unexpected props passed: ${unexpectedPropsString}
    `)
  }
}

function approveRequiredProperties(inputIdToValidationInfo, requestBody) {
  const requiredKeys = toRequiredKeys(inputIdToValidationInfo),
    passedKeys = Object.keys(requestBody),
    missingKeys = discardAll(passedKeys)(requiredKeys)

  if (isLaden(missingKeys)) {
    return `You are missing the following keys: ${join(', ')(missingKeys)}`
  }
}

function approveValidProperties(inputIdToValidationInfo, requestBody) {
  const inputIdToApprove = map(getValueAt('approve'))(inputIdToValidationInfo),
    invalidIdToReason = passThrough(requestBody, [
      map((value, key) => inputIdToApprove[key](value)),
      keepWhen(isLaden),
    ]),
    numberOfInvalidProperties = getCount(invalidIdToReason)

  if (numberOfInvalidProperties > 0) {
    const invalidProps = passThrough(invalidIdToReason, [
        getArrayOfKeys,
        pickAllFrom(requestBody),
        truncateDirtyArgs,
      ]),
      reasons = passThrough(invalidIdToReason, [
        map((value, key) => `${key}: ${value}`),
        getArrayOfValues,
        join('\n\n'),
      ])

    return tedent(`
      Invalid properties were passed:
      ${invalidProps}

      reasons:
      ${reasons}
    `)
  }
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

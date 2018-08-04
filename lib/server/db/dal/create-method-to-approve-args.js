//---------//
// Imports //
//---------//

import couchdbBase64 from 'couchdb-base64'
import tedent from 'tedent'
import typeDetect from 'type-detect'

import presetFields from './preset-fields'

import { methods } from './helpers'
import { isTruthy, truncateDirtyArgs, truncate } from 'universal/utils'
import {
  containedIn,
  discardAll,
  discardWhen,
  getArrayOfKeys,
  getValueAt,
  hasOwnEnumerableKey as hasKey,
  isEmpty,
  isLaden,
  join,
  keepWhen,
  map,
  mAppend,
  mSet,
  omit,
  omitAll,
  passThrough,
  pickAll,
  reduce,
  transformProperties,
} from 'fes'

//
//------//
// Init //
//------//

const shouldApprove = getShouldApprove(),
  { keys } = Object,
  { _id, _rev } = presetFields,
  propertyIsTruthy = getValueAt,
  validOptions = new Set(['allow404', 'returnRawResponse'])

//
//------//
// Main //
//------//

const createMethodToApproveArgs = databaseDefinition => {
  const { fields, hasCustomId } = databaseDefinition

  return reduce((methodToApproveArgs, method) => {
    let fieldsToApprove = []

    if (shouldApprove.fields(method)) fieldsToApprove.push(...fields)
    if (shouldApprove.documentId(method)) fieldsToApprove.push(_id)
    if (shouldApprove.revision(method)) fieldsToApprove.push(_rev)

    if (method === 'create') {
      fieldsToApprove = discardWhen(hasKey('autogenerate'))(fieldsToApprove)
    }

    const approveArgs = createApproveArgs(fieldsToApprove, method, hasCustomId)

    return mSet(method, approveArgs)(methodToApproveArgs)
  }, {})(methods)
}

//
//------------------//
// Helper Functions //
//------------------//

function createApproveArgs(fieldsToApprove, method, hasCustomId) {
  const approveFieldNames = createApproveFieldNames(fieldsToApprove),
    fieldNameToApprove = reduce(toApprove, {})(fieldsToApprove)

  return (...args) => {
    if (isEmpty(args)) return new Error('You must pass a single argument')
    if (args.length > 2) {
      const truncatedArgs = truncateDirtyArgs(args)

      return new Error(
        tedent(`
          You passed more than two arguments
          Arguments passed:

          ${truncatedArgs}
        `)
      )
    }
    let firstArg = args[0]
    const firstArgType = typeDetect(firstArg),
      secondArg = args[1] || {},
      secondArgType = typeDetect(secondArg)

    if (firstArgType !== 'Object') {
      return new Error(
        tedent(`
          The first argument passed was not type 'Object' (via type-detect)
          Type: ${firstArgType}
          nArg: ${truncate(firstArg)}
        `)
      )
    }

    if (secondArgType !== 'Object') {
      return new Error(
        tedent(`
          The second argument passed was not type 'Object' (via type-detect)
          Type: ${secondArgType}
          Arg: ${truncate(secondArg)}
        `)
      )
    }

    const optionsError = approveOptions(secondArg)
    if (optionsError) return optionsError

    if (hasCustomId) {
      if (method === 'create') {
        if (!firstArg._id) {
          return new Error(
            tedent(`
              This database requires you pass a custom _id
              Arg: ${truncate(firstArg)}
            `)
          )
        }
        firstArg = omit('_id')(firstArg)
      }
      if (!couchdbBase64.isCouchdbBase64String(firstArg._id)) {
        return new Error(
          tedent(`
            _id must pass isCouchdbBase64String

            _id: ${firstArg._id}
          `)
        )
      }
    }

    const error = approveFieldNames(firstArg)
    if (error) return error

    const fieldToErrorMessage = passThrough(firstArg, [
      transformProperties(fieldNameToApprove),
      keepWhen(isTruthy),
    ])

    if (isLaden(fieldToErrorMessage)) {
      const invalidFields = pickAll(keys(fieldToErrorMessage))(firstArg),
        truncatedFields = truncateDirtyArgs(invalidFields)

      const errorReasons = passThrough(fieldToErrorMessage, [
        reduce(toArrayOfReasons, []),
        join('\n\n'),
      ])

      const invalidFieldsMessage = `The following fields are invalid: ${truncatedFields}`,
        errorReasonMessage = tedent(`
          They are invalid for the following reasons:

          ${errorReasons}
        `)

      return new Error(`${invalidFieldsMessage}\n\n${errorReasonMessage}`)
    }
  }
}

function createApproveFieldNames(fieldsToApprove) {
  const validFieldNames = map(getValueAt('name'))(fieldsToApprove),
    requiredFieldNames = passThrough(fieldsToApprove, [
      keepWhen(propertyIsTruthy('isRequired')),
      map(getValueAt('name')),
    ])

  return fieldsObject => {
    const fieldNamesPassed = keys(fieldsObject),
      invalidFields = omitAll(validFieldNames)(fieldsObject)

    if (isLaden(invalidFields)) {
      const invalidFieldsErrorMessage = truncateDirtyArgs(invalidFields),
        fieldsAllowedMessage = isLaden(validFieldNames)
          ? join(', ')(validFieldNames)
          : '<none>'

      return new Error(
        tedent(`
          Invalid fields were passed
          Fields allowed: ${fieldsAllowedMessage}
          Fields passed: ${invalidFieldsErrorMessage}
        `)
      )
    }

    const missingFields = discardAll(fieldNamesPassed)(requiredFieldNames)
    if (isLaden(missingFields)) {
      return new Error(
        `The following fields are missing: ${join(', ')(missingFields)}`
      )
    }
  }
}

function toApprove(fieldToApprove, field) {
  return mSet(field.name, field.approve)(fieldToApprove)
}

function getShouldApprove() {
  return {
    documentId: containedIn(['delete', 'get', 'update']),
    fields: containedIn(['create', 'update']),
    revision: containedIn(['delete', 'update']),
  }
}

function toArrayOfReasons(result, reason, key) {
  return mAppend(`${key}: ${reason}`)(result)
}

function approveOptions(secondArg) {
  const invalidKeys = passThrough(secondArg, [
    getArrayOfKeys,
    discardAll(validOptions),
  ])

  if (isLaden(invalidKeys)) {
    return new Error(
      tedent(`
        Invalid options were passed
        Options allowed: ${join(', ')(validOptions)}
        Invalid options passed: ${join(', ')(invalidKeys)}
      `)
    )
  }

  const invalidOptions = discardWhen(isBoolean)(secondArg)
  if (isLaden(invalidOptions)) {
    return new Error(
      tedent(`
        All options must be typeof boolean
        Invalid options: ${truncateDirtyArgs(invalidOptions)}
      `)
    )
  }
}

function isBoolean(value) {
  return typeof value === 'boolean'
}

//
//---------//
// Exports //
//---------//

export default createMethodToApproveArgs

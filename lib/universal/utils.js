//---------//
// Imports //
//---------//

import decamelize from 'decamelize'
import tedent from 'tedent'
import errorStackParser from 'error-stack-parser'
import random from 'lodash/random'
import typeDetect from 'type-detect'

import api from './api'
import createApproveSimpleInput from './create-approve-simple-input'
import jstring from './jstring'
import repeatString from './repeat-string'
import setValueAtPath from './set-value-at-path'
import truncateDirtyArgs from './truncate-dirty-args'
import truncate from './truncate'

import { mapStackTrace } from 'sourcemapped-stacktrace'
import {
  alwaysReturn as justReturn,
  discardFirst,
  forEach,
  getValueAt,
  getValueAtPath,
  isEmpty,
  isLaden,
  join,
  keepWhen,
  last,
  map,
  mSet,
  passThrough,
  pickAll,
  reduce,
  reduceFresh,
  startsWith,
} from 'fes'

//
//------//
// Init //
//------//

const currentCommitHash = process.env.CURRENT_COMMIT_HASH,
  isDevelopment = process.env.NODE_ENV === 'development',
  skipRequestRe = /webpack-internal/

//
//------//
// Main //
//------//

//
// This method assumes anObject is an object with keys
//
const approveAllPropertiesAreLaden = anObject => {
  const invalidProps = keepWhen(val => isEmpty(val))(anObject)

  if (isLaden(invalidProps)) {
    const stringifiedInvalidProps = passThrough(invalidProps, [
      map(value => '' + value),
      jstring,
    ])

    return new Error(
      tedent(`
        The following properties must be truthy
        invalid props: ${stringifiedInvalidProps}
      `)
    )
  }
}

const approveIsBoolean = value => {
  if (typeof value !== 'boolean') {
    return tedent(`
      Value must be typeof 'boolean'
      typeof value: ${typeof value}
      value: ${jstring(value)}
    `)
  }
}

const approveIsLaden = value => {
  if (isEmpty(value)) {
    return tedent(`
      Value must pass 'isLaden'
      value: ${jstring(value)}
    `)
  }
}

const approveIsLadenString = value => {
  if (typeof value !== 'string') {
    return tedent(`
      value is not typeof 'string'
      typeof value: ${typeof value}
      value: ${jstring(value)}
    `)
  } else if (value === '') {
    return 'value cannot be an empty string'
  }
}

const bindAll = (arrayOfPropNames, object) => {
  const result = {}
  arrayOfPropNames.forEach(propName => {
    result[propName] = object[propName].bind(object)
  })
  return result
}

const callEach = (anArgument, arrayOfFunctions) => {
  forEach(fn => fn(anArgument))(arrayOfFunctions)
  return anArgument
}

const capitalizeFirstLetter = aString =>
  aString[0].toUpperCase() + aString.slice(1)

function createRange(start = 0, end) {
  if (arguments.length === 1) {
    if (start === 0) return []

    end = start > 0 ? start - 1 : start + 1
    start = 0
  }

  let j = start

  const result = new Array(Math.abs(end - start) + 1),
    stepJ =
      start < end
        ? () => {
            j += 1
          }
        : () => {
            j -= 1
          }

  for (let i = 0; i < result.length; i += 1) {
    result[i] = j
    stepJ()
  }

  return result
}

const createRejectWrapper = reject => messageOrError => {
  const error =
    typeDetect(messageOrError) === 'Error'
      ? messageOrError
      : new Error(messageOrError)

  return reject(error)
}

const dashelize = aString => decamelize(aString, '-')

const discardPreceding = aString => {
  return startsWith(aString) ? discardFirst(aString.length) : aString
}

const findFirstValueWithTruthyKey = arrayOfPairs => {
  for (const [key, value] of arrayOfPairs) {
    if (key) return value
  }
}

const getRandomElementFrom = anArray => {
  return anArray[random(0, anArray.length - 1)]
}

const hasLength = length => something =>
  getValueAt('length')(something) === length

const isFalsey = something => !something

const isTruthy = something => !!something

const keepAllButLast = anArray => anArray.slice(0, -1)

const log = something => {
  console.log(something) // eslint-disable-line no-console
}

const logError = err => {
  console.error(err) // eslint-disable-line no-console
}

const logErrorToServer = ({ context, error, ignoreStack }) => {
  if (!error) {
    error = new Error('(no error was passed)')
    ignoreStack = true
  }

  if (ignoreStack) {
    return api
      .post('/log', createPostBody(error, context, '(no stack)'))
      .catch(noop)
  }

  const eventualStack = process.env.VUE_ENV
    ? mapStackTrace(error, { shouldSkipRequest })
    : Promise.resolve(errorStackParser.parse(error).map(getValueAt('source')))

  error.wasReported = true

  return (
    eventualStack
      .catch(eventualStackError => {
        //
        // if there's an error parsing the stack then we also want to log that
        //   on the server
        //

        // a non-parsed stack property includes the message because devs know
        //   better than you
        logError(eventualStackError.stack)

        return api
          .post(
            '/log',
            createPostBody(
              eventualStackError,
              'during mapStackTrace',
              eventualStackError.stack
            )
          )
          .then(justReturn(undefined))
      })
      .then((stack = error.stack) => {
        if (Array.isArray(stack)) stack = stack.join('\n')
        else if (typeof stack !== 'string') stack = '<unexpected stack value>'

        if (isDevelopment) {
          logError(
            tedent(`
              occurred ${context}

              ${error.message}

              ${stack}
            `)
          )
        }

        return api.post('/log', createPostBody(error, context, stack))
      })
      // nothing left to do
      .catch(noop)
  )
}

const mAddToSet = something => aSet => aSet.add(something)

const mRemoveAtIndex = index => anArray => {
  anArray.splice(index, 1)
  return anArray
}

const noop = () => {}

const reject = msg => Promise.reject(new Error(msg))

const removeExtension = filename => {
  const periodIndex = filename.lastIndexOf('.')
  return filename.slice(0, periodIndex)
}

const sequentiallyResolveEach = (asyncFunctions, arg) => {
  return reduce(toResolvedPromise, Promise.resolve(arg))(asyncFunctions)
}

const setShowErrorView = commit => _unused_error => {
  // TODO: create universal logger and log the error here
  commit('setShowErrorView', true, { root: true })
}

const setShowNotFoundOrErrorView = commit => error => {
  const status = getValueAtPath(['response', 'status'])(error),
    mutation = status === 404 ? 'setShowNotFoundView' : 'setShowErrorView'

  logErrorToServer({
    context: 'during route - setShowNotFoundOrErrorView',
    error,
  })
  commit(mutation, true, { root: true })
}

const toCommaList = join(', ')

const toEnum = reduceFresh((result, val) => mSet(val, val)(result), () => ({}))

const toWrittenList = arrayOfStrings => {
  if (arrayOfStrings.length === 0) return ''
  else if (arrayOfStrings.length === 1) return arrayOfStrings[0]

  return keepAllButLast(arrayOfStrings).join(', ') + last(arrayOfStrings)
}

const waitMs = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const wrapIn = (left, right) => value => `${left}${value}${right}`

//
//------------------//
// Helper Functions //
//------------------//

function createPostBody(error, context, stack) {
  const body = {
    stack,
    commitHash: currentCommitHash,
    context: `occurred ${context}`,
    environment: process.env.ENVIRONMENT,
    message: error.message,
  }

  if (error.response) {
    const { config, data } = error.response
    body.other = {
      config: passThrough(config, [
        pickAll(['header', 'method', 'url']),
        jstring,
      ]),
      data: jstring(data),
    }
  }

  return body
}

function shouldSkipRequest(fileName) {
  return skipRequestRe.test(fileName)
}

function toResolvedPromise(result, asyncFunction) {
  return result.then(asyncFunction)
}

//
//---------//
// Exports //
//---------//

export * from './promise-utils'
export { default as assignAllLeaves } from './assign-all-leaves'

export {
  approveAllPropertiesAreLaden,
  approveIsBoolean,
  approveIsLaden,
  approveIsLadenString,
  bindAll,
  callEach,
  capitalizeFirstLetter,
  createApproveSimpleInput,
  createRange,
  createRejectWrapper,
  dashelize,
  discardPreceding,
  findFirstValueWithTruthyKey,
  getRandomElementFrom,
  hasLength,
  isFalsey,
  isTruthy,
  jstring,
  keepAllButLast,
  log,
  logError,
  logErrorToServer,
  mAddToSet,
  mRemoveAtIndex,
  noop,
  reject,
  removeExtension,
  repeatString,
  sequentiallyResolveEach,
  setShowErrorView,
  setShowNotFoundOrErrorView,
  setValueAtPath,
  toCommaList,
  toEnum,
  toWrittenList,
  truncate,
  truncateDirtyArgs,
  waitMs,
  wrapIn,
}

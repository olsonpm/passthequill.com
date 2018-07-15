//---------//
// Imports //
//---------//

import decamelize from 'decamelize'
import dedent from 'dedent'
import errorStackParser from 'error-stack-parser'

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
  getValueAt,
  getValueAtPath,
  isEmpty,
  isLaden,
  join,
  keepWhen,
  map,
  mSet,
  passThrough,
  reduce,
  reduceFresh,
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
      'The following properties must be truthy' +
        `\ninvalid props: ${stringifiedInvalidProps}`
    )
  }
}

const approveIsLaden = value => {
  if (isEmpty(value)) {
    return dedent(`
      Value must pass 'isLaden'
      value: ${jstring(value)}
    `)
  }
}

const approveIsLadenString = value => {
  if (typeof value !== 'string') {
    return dedent(`
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

const capitalizeFirstLetter = aString =>
  aString[0].toUpperCase() + aString.slice(1)

const dashelize = aString => decamelize(aString, '-')

const hasLength = length => something =>
  getValueAt('length')(something) === length

const isFalsey = something => !something

const isTruthy = something => !!something

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
      .post('/log', {
        stack: '(no stack)',
        context: `Error occurred ${context}`,
        environment: process.env.ENVIRONMENT,
        message: error.message,
        commitHash: currentCommitHash,
      })
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
          .post('/log', {
            context: 'Error occurred during mapStackTrace',
            environment: process.env.ENVIRONMENT,
            stack: eventualStackError.stack,
            message: eventualStackError.message,
            commitHash: currentCommitHash,
          })
          .then(justReturn(undefined))
      })
      .then((stack = error.stack) => {
        if (Array.isArray(stack)) stack = stack.join('\n')
        else if (typeof stack !== 'string') stack = '<unexpected stack value>'

        if (isDevelopment) {
          logError(
            dedent(`
              Error occurred ${context}

              ${error.message}

              ${stack}
            `)
          )
        }

        return api.post('/log', {
          stack,
          context: `Error occurred ${context}`,
          environment: process.env.ENVIRONMENT,
          message: error.message,
          commitHash: currentCommitHash,
        })
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

const waitMs = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const wrapIn = (left, right) => value => `${left}${value}${right}`

//
//------------------//
// Helper Functions //
//------------------//

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

export {
  approveAllPropertiesAreLaden,
  approveIsLaden,
  approveIsLadenString,
  bindAll,
  capitalizeFirstLetter,
  createApproveSimpleInput,
  dashelize,
  hasLength,
  isFalsey,
  isTruthy,
  jstring,
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
  truncate,
  truncateDirtyArgs,
  waitMs,
  wrapIn,
}

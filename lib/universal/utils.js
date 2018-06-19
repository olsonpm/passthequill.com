//---------//
// Imports //
//---------//

import decamelize from 'decamelize'
import dedent from 'dedent'
import errorStackParser from 'error-stack-parser'

import api from './api'
import jstring from './jstring'

import { mapStackTrace } from 'sourcemapped-stacktrace'
import {
  alwaysReturn as justReturn,
  getValueAt,
  getValueAtPath,
  isEmpty,
  join,
  mSet,
  reduce,
  reduceFresh,
} from 'fes'

//
//------//
// Init //
//------//

const currentCommitHash = process.env.CURRENT_COMMIT_HASH,
  skipRequestRe = /webpack-internal/

//
//------//
// Main //
//------//

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

const dashelize = aString => decamelize(aString, '-')

const hasLength = length => something =>
  getValueAt('length')(something) === length

const invokeWhenCalled = aFunction => () => aFunction()

const isFalsey = something => !something

const isTruthy = something => !!something

const log = something => {
  console.log(something) // eslint-disable-line no-console
}

const logError = err => {
  console.error(err) // eslint-disable-line no-console
}

const logErrorToServer = ({ context, error }) => {
  const eventualStack = process.env.VUE_ENV
    ? mapStackTrace(error, { shouldSkipRequest })
    : Promise.resolve(errorStackParser.parse(error).map(getValueAt('source')))

  return (
    eventualStack
      .catch(eventualStackError => {
        //
        // if there's an error parsing the stack then we also want to log that
        //   on the server
        //
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

        return api.post('/log', {
          context: `Error occurred ${context}`,
          environment: process.env.ENVIRONMENT,
          stack: stack.join('\n'),
          message: error.message,
          commitHash: currentCommitHash,
        })
      })
      // not much we can do except console.error the error
      .catch(logError)
  )
}

const mAddToSet = something => aSet => aSet.add(something)

const mRemoveAtIndex = index => anArray => {
  anArray.splice(index, 1)
  return anArray
}

const noop = () => {}

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
export { default as truncateDirtyArgs } from './truncate-dirty-args'
export { default as repeatString } from './repeat-string'
export { default as truncate } from './truncate'
export { default as setValueAtPath } from './set-value-at-path'
export {
  default as createApproveSimpleInput,
} from './create-approve-simple-input'

export {
  approveIsLaden,
  approveIsLadenString,
  bindAll,
  dashelize,
  hasLength,
  invokeWhenCalled,
  isFalsey,
  isTruthy,
  jstring,
  log,
  logError,
  logErrorToServer,
  mAddToSet,
  mRemoveAtIndex,
  noop,
  removeExtension,
  sequentiallyResolveEach,
  setShowErrorView,
  setShowNotFoundOrErrorView,
  toCommaList,
  toEnum,
  waitMs,
  wrapIn,
}

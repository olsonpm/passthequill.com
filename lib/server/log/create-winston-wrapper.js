//---------//
// Imports //
//---------//

import tedent from 'tedent'

import createDailyRotatingLogger, {
  levels,
} from './create-daily-rotating-logger'

import { discardPreceding, jstring } from '../../universal/utils'

import { append, map, passThrough } from 'fes'

//
//------//
// Main //
//------//

const createWinstonWrapper = name => {
  const dailyRotatingLogger = createDailyRotatingLogger(name)

  return map(toWrapper)(levels)

  // scoped helper functions

  function toWrapper(_unused_levelInteger, levelName) {
    return (...args) => {
      if (levelName === 'error') return logError(dailyRotatingLogger, ...args)
      else return logMessage(dailyRotatingLogger, levelName, args[0])
    }
  }
}

function logMessage(dailyRotatingLogger, levelName, message) {
  dailyRotatingLogger[levelName](message)
}

function logError(dailyRotatingLogger, ...args) {
  // eslint-disable-next-line prefer-const
  let [prependToError, error] = args

  if (args.length === 2) {
    error.message = prependToError + '\n\n' + error.message
  } else {
    error = prependToError
  }

  if (isResponseError(error)) {
    logResponseError(dailyRotatingLogger, error)
    return
  }

  passThrough(error.stack, [
    discardPreceding('Error: '),
    discardPreceding('error '),
    append('\n\n\n\n'),
    dailyRotatingLogger.error,
  ])
}

//
//------------------//
// Helper Functions //
//------------------//

function logResponseError(dailyRotatingLogger, e) {
  const requestInfo = e.request
    ? `
      request
        url: ${e.config.url}
        method: ${e.config.method}
        data: ${jstring(e.request.data)}
    `.trim()
    : ''

  const responseInfo = e.response
    ? `
      response
        status: ${e.response.status}
        message: ${e.response.statusText}
        data: ${jstring(e.response.data)}
    `.trim()
    : ''

  return dailyRotatingLogger.error(
    tedent(`
      axios error: ${e.message}

      ${requestInfo}

      ${responseInfo}
    `) + '\n\n\n\n'
  )
}

function isResponseError(e) {
  return e.request && e.response
}

//
//---------//
// Exports //
//---------//

export default createWinstonWrapper

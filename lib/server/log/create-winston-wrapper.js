//---------//
// Imports //
//---------//

import createDailyRotatingLogger, {
  levels,
} from './create-daily-rotating-logger'

import { discardPreceding, logResponseError } from '../../universal/utils'

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

  if (error.request) {
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
//---------//
// Exports //
//---------//

export default createWinstonWrapper

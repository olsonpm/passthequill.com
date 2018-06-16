//---------//
// Imports //
//---------//

import winston from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

import { logDirectory } from '../../../config/app'

//
//------//
// Init //
//------//

const { Logger } = winston,
  levels = { error: 0, concern: 1, info: 2 }

//
//------//
// Main //
//------//

const createDailyRotatingLogger = name => {
  const transport = new winston.transports.DailyRotateFile({
    dirname: path.resolve(logDirectory, name),
    filename: '%DATE%.log',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    utc: true,
  })

  return new Logger({
    levels,
    transports: [transport],
  })
}

//
//---------//
// Exports //
//---------//

export { levels }
export default createDailyRotatingLogger

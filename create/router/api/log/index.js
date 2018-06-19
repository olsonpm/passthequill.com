//---------//
// Imports //
//---------//

import dedent from 'dedent'

import * as rateLimit from './rate-limit'

import { dal } from 'server/db'
import { createIfRequestIsValid } from 'server/utils'
import { logError } from 'universal/utils'
import { handleErrorDuringRoute } from '../helpers'
import {
  applyAt,
  join,
  map,
  passThrough,
  pickAll,
  truncateToNChars,
  truncateToNLines,
} from 'fes'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('log')

//
//------//
// Main //
//------//

const post = ifRequestIsValid(ctx => {
  try {
    const { commitHash, context, environment } = ctx.request.body,
      { ip } = ctx.request,
      { userAgent } = ctx,
      { message, stack } = passThrough(ctx.request.body, [
        pickAll(['message', 'stack']),
        map(truncate),
      ]),
      logRecord = {
        commitHash,
        context,
        environment,
        ip,
        message,
        stack,
        userAgent,
      },
      errorArguments = [logRecord]

    return dal.log
      .create(logRecord)
      .then(() => {
        ctx.status = 200
        ctx.body = {
          result: 'log created successfully',
        }
      })
      .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArguments))
  } catch (e) {
    // no need to throw errors if logging has an issue
    logError(e)
    return Promise.resolve()
  }
})

//
//------------------//
// Helper Functions //
//------------------//

function truncate(aString) {
  return passThrough(aString, [
    truncateToNLines(20),
    applyAt('split', ['\n']),
    map(truncateToNChars(200)),
    join('\n'),
  ])
}

function createErrorMessage(logRecord) {
  const {
    commitHash,
    context,
    environment,
    ip,
    message,
    stack,
    userAgent,
  } = logRecord

  const friendly = 'creating a log',
    detailed = dedent(`
      An error occurred while creating a log

      commitHash: ${commitHash}
      context: ${context}
      environment: ${environment}
      ip: ${ip}
      message: ${message}
      stack: ${stack}
      userAgent: ${userAgent}
    `)

  return { detailed, friendly }
}

//
//---------//
// Exports //
//---------//

export default { post, rateLimit }

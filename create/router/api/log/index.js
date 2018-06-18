//---------//
// Imports //
//---------//

import dedent from 'dedent'

import * as rateLimit from './rate-limit'

import { dal } from 'server/db'
import { createIfRequestIsValid } from 'server/utils'
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
  const { commitHash, context } = ctx.request.body,
    { ip } = ctx.request,
    { message, stack } = passThrough(ctx.request.body, [
      pickAll(['message', 'stack']),
      map(truncate),
    ]),
    errorArguments = [commitHash, context, ip, message, stack]

  dal.clientLog
    .create({ commitHash, context, ip, message, stack })
    .then(() => {
      ctx.status = 200
      ctx.body = {
        result: 'log created successfully',
      }
    })
    .catch(handleErrorDuringRoute(ctx, createErrorMessage, errorArguments))
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

function createErrorMessage(commitHash, context, ip, message, stack) {
  const friendly = 'creating a log',
    detailed = dedent(`
      An error occurred while creating a log
      commitHash: ${commitHash}
      context: ${context}
      ip: ${ip}
      message: ${message}
      stack: ${stack}
    `)

  return { detailed, friendly }
}

//
//---------//
// Exports //
//---------//

export { post, rateLimit }

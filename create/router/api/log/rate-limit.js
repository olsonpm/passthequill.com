//---------//
// Imports //
//---------//

import dedent from 'dedent'
import dedentMacro from 'dedent'

import { RateLimit } from 'koa2-ratelimit'

import log from 'server/log'
import { jstring } from 'universal/utils'

//
//------//
// Main //
//------//

const allRequests = getLogConstantRateLimiter()

const perIp = getLogIpRateLimiter()

//
//------------------//
// Helper Functions //
//------------------//

function getLogIpRateLimiter() {
  const max = 10,
    interval = { min: 1 }

  return RateLimit.middleware({
    interval,
    max,
    keyGenerator: ctx => ctx.request.ip,
    onLimitReached: ctx => {
      log.http.concern(
        `Max log rate limit reached for ip: ${ctx.request.ip}` +
          `\n  max: ${max}` +
          `\n  interval: ${jstring(interval)}`
      )
    },
    message: 'Too many logs created from this IP',
  })
}

//
// This is just meant to prevent spoofed IP spam.  It'd be nice not to have my
//   log files fill up with nonsense :)
//
function getLogConstantRateLimiter() {
  const max = 100,
    interval = { min: 1 }

  return RateLimit.middleware({
    interval,
    max,
    keyGenerator: () => 'constant',
    onLimitReached: () => {
      log.http.concern(
        'Max log constant rate limit reached' +
          `\n  max: ${max}` +
          `\n  interval: ${jstring(interval)}`
      )
    },
    message: dedentMacro(`
      Unfortunately it seems this server is getting spammed with requests.
        Please understand that on the web it's difficult to prevent determined
        "bad guys".
    `),
  })
}

//
//---------//
// Exports //
//---------//

export { allRequests, perIp }

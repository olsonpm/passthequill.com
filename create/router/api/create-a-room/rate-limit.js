//---------//
// Imports //
//---------//

import dedent from 'dedent'

import { RateLimit } from 'koa2-ratelimit'

import log from 'server/log'
import { jstring } from 'universal/utils'

//
//------//
// Main //
//------//

const allRequests = getCreateARoomConstantRateLimiter()

const perIp = getCreateARoomIpRateLimiter()

//
//------------------//
// Helper Functions //
//------------------//

function getCreateARoomIpRateLimiter() {
  const max = 10,
    interval = { min: 30 }

  return RateLimit.middleware({
    interval,
    max,
    keyGenerator: ctx => ctx.request.ip,
    onLimitReached: ctx => {
      log.http.concern(
        dedent(`
          Max create-a-room rate limit reached for ip: ${ctx.request.ip}
            max: ${max}
            interval: ${jstring(interval)}
        `)
      )
    },
    message: 'Too many rooms created from this IP',
  })
}

//
// This is just meant to prevent spoofed IP spam.  It'd be nice not to have my
//   email server blacklisted :)
//
function getCreateARoomConstantRateLimiter() {
  const max = 100,
    interval = { min: 1 }

  return RateLimit.middleware({
    interval,
    max,
    keyGenerator: () => 'constant',
    onLimitReached: () => {
      log.http.concern(
        dedent(`
          Max create-a-room constant rate limit reached
            max: ${max}
            interval: ${jstring(interval)}
        `)
      )
    },
    message: dedent(`
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

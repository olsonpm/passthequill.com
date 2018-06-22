//
// TODO: make this its own repo on github
//

//---------//
// Imports //
//---------//

import fs from 'fs'
import ms from 'ms'

import {
  addDays,
  differenceInMillisecondsFrom,
  setHour,
  startOfHour,
} from './fp_date-fns'

//
//------//
// Init //
//------//

const msInADay = ms('1 day')

//
//------//
// Main //
//------//

const checkCertAndKeyDaily = (server, certAndKeyPaths) => {
  let currentCertAndKey = getCertAndKey(certAndKeyPaths)

  const now = new Date(),
    msTil4am = passThrough(now, [
      addDays(1),
      setHour(4),
      startOfHour,
      differenceInMillisecondsFrom(now),
    ])

  // at 4am
  waitMs(msTil4am).then(() => {
    // start the daily check
    setInterval(() => {
      currentCertAndKey = checkForUpdatedCertAndKeyDaily(
        server,
        currentCertAndKey
      )
    }, msInADay)
  })

  return currentCertAndKey
}

function getCertAndKey({ pathToCert, pathToKey }) {
  return {
    cert: fs.readFileSync(pathToCert),
    key: fs.readFileSync(pathToKey),
  }
}

function checkForUpdatedCertAndKeyDaily(server, previous) {
  const current = getCertAndKey()
  if (certAndKeyAreEqual(current, previous)) return previous
  // else we have a new cert and key!

  //
  // WARN: the below uses an internal node api and can't be trusted between
  //   versions of node.  However it seems to be the way kids are doing it
  //   these days
  //
  // https://github.com/nodejs/node/issues/4464#issuecomment-296467506
  //
  server._sharedCreds.context.setCert(current.cert)
  server._sharedCreds.context.setKey(current.key)
  return current
}

function certAndKeyAreEqual(current, previous) {
  return current.cert.equals(previous.cert) && current.key.equals(previous.key)
}

//
//------------------//
// Helper Functions //
//------------------//

function passThrough(arg, functionArray) {
  return functionArray.reduce((result, aFunction) => aFunction(result), arg)
}

function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//
//---------//
// Exports //
//---------//

export default checkCertAndKeyDaily

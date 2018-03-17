//
//------//
// Init //
//------//

/* eslint-disable no-console,no-unused-vars */

import inspect from 'object-inspect'
import { flow } from 'fes'

const log = (msg = '') => {
    console.log(msg)
  },
  logError = err => {
    console.error(err)
  },
  ilog = flow([inspect, log]),
  jstring = obj => {
    const replacer = createReplacer()
    return JSON.stringify(obj, replacer, 2)
  },
  jlog = flow([jstring, log]),
  logf = msg => () => log(msg)

function createReplacer() {
  const duplicateObjects = new Map()

  return (key, value) => {
    if (value && typeof value === 'object') {
      if (duplicateObjects.has(value)) {
        return `<duplicate of '${duplicateObjects.get(value)}'>`
      } else {
        duplicateObjects.set(value, key)
        return value
      }
    }
    return typeof value === 'function' ? '<function>' : value
  }
}

/* eslint-enable no-console,no-unused-vars */

//
//------//
// Main //
//------//

import { encryptEmail } from '../lib/server/email/encrypt'

const email1 = encryptEmail('test1@a.com'),
  email2 = encryptEmail('test2@a.com')

Promise.all([email1, email2]).then(([email1, email2]) => {
  log(`email1: ${email1}`)
  log(`email2: ${email2}`)
})

// import { dal, createAllDatabases, deleteAllDatabases } from '../lib/server/db'
//
// deleteAllDatabases().then(logf('done!'))
//
// run().then(logf('done!'))
//
// async function run() {
//   let response
//
//   try {
//     await createAllDatabases()
//     log('databases created')
//
//     response = await dal.activeRoom.create({})
//     log('activeRoom document created')
//
//     log(`status: ${response.status}`)
//     jlog(response.data)
//     log()
//     const { momentCreated } = extractDataFromId(response.data._id)
//     log(momentCreated.format())
//   } catch (e) {
//     logError(e)
//   } finally {
//     await deleteAllDatabases()
//     log('databases deleted')
//   }
// }

//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { docidToHash } from '../../lib/server/db'
import { dal } from 'server/db'
import { log } from 'universal/utils'

//
//------//
// Init //
//------//

const logThenNewline = msg => {
  log(msg + '\n')
}

const encryptedEmail =
  '$2b$04$7Umq.2nzEiMyGhgmQ2h8S.CsqjI/FojsBBWhLQ09HHL94QpyLTs1e'

//
//------//
// Main //
//------//

const name = 'unsubscription-exists'

const install = () =>
  Promise.all([createUnsubscription(), createEmailSentRecord()])

//
//------------------//
// Helper Functions //
//------------------//

function createUnsubscription() {
  return dal.emailUnsubscription.create({
    _id: encryptedEmail,
    types: ['all', 'invitation', 'room-created'],
  })
}

function createEmailSentRecord() {
  return dal.emailSent
    .create({
      to: encryptedEmail,
      type: 'room-created',
    })
    .then(({ _id }) => {
      logThenNewline(
        tedent(`
          emailSent:
            hash: ${docidToHash(_id)}
        `)
      )
    })
}

//
//---------//
// Exports //
//---------//

export default { install, name }

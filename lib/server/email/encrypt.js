//---------//
// Imports //
//---------//

import bcryptjs from 'bcryptjs'

import { createHandleServerError } from 'server/utils'
import { salt } from 'project-root/config/app'
import { map, passThrough, prepend } from 'fes'

//
//------//
// Main //
//------//

const encryptEmail = email =>
  bcryptjs
    .hash(email, salt.email)
    .catch(createHandleServerError(createEncryptEmailMessage, [email]))

const encryptAllEmails = allEmails =>
  passThrough(allEmails, [
    map(email => bcryptjs.hash(email, salt.email)),
    eventualEncryptedEmails =>
      Promise.all(eventualEncryptedEmails).catch(
        createHandleServerError(createEncryptAllEmailsMessage, [allEmails])
      ),
  ])

//
//------------------//
// Helper Functions //
//------------------//

function createEncryptEmailMessage(email) {
  return {
    friendly: 'encrypting the email address',
    detailed: `error while encrypting the email address: ${email}`,
  }
}

function createEncryptAllEmailsMessage(allEmails) {
  return {
    friendly: 'error while encrypting the email addresses',
    detailed:
      'error while encrypting the following email addresses:' +
      `${map(prepend('\n'))(allEmails)}`,
  }
}

//
//---------//
// Exports //
//---------//

export { encryptEmail, encryptAllEmails }

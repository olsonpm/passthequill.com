//---------//
// Imports //
//---------//

import { dal } from 'server/db'
import { resolveAllProperties } from 'universal/utils'

//
//------//
// Main //
//------//

const createEmailSentRecords = encryptedEmails => {
  const [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails

  return resolveAllProperties({
    player1EmailSentData: createPlayer1EmailSentRecord(player1EncryptedEmail),
    player2EmailSentData: createPlayer2EmailSentRecord(player2EncryptedEmail),
    encryptedEmails,
  })
}

//
//------------------//
// Helper Functions //
//------------------//

function createPlayer1EmailSentRecord(player1EncryptedEmail) {
  return dal.emailSent.create({
    to: player1EncryptedEmail,
    type: 'room-created',
  })
}

function createPlayer2EmailSentRecord(player2EncryptedEmail) {
  return dal.emailSent.create({
    to: player2EncryptedEmail,
    type: 'invitation',
  })
}

//
//---------//
// Exports //
//---------//

export default createEmailSentRecords

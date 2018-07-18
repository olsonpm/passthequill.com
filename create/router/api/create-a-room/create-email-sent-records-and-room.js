//---------//
// Imports //
//---------//

import { dal } from 'server/db'
import { resolveAllProperties } from 'universal/utils'

//
//------//
// Init //
//------//

const guideOpts = {
  returnRawResponse: true,
  allow404: true,
}

//
//------//
// Main //
//------//

const createEmailSentRecordsAndRoom = encryptedEmails => {
  const [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails,
    player = resolveAllProperties({
      one: resolvePlayer(player1EncryptedEmail, 'room-created'),
      two: resolvePlayer(player2EncryptedEmail, 'invitation'),
    })

  return resolveAllProperties({
    player,
    roomData: dal.activeRoom.create({}),
  })
}

//
//------------------//
// Helper Functions //
//------------------//

function resolvePlayer(encryptedEmail, emailType) {
  return resolveAllProperties({
    encryptedEmail,
    emailSentData: createEmailSentRecord(encryptedEmail, emailType),
    guide: dal.guide.get({ _id: encryptedEmail }, guideOpts),
  })
}

function createEmailSentRecord(encryptedEmail, emailType) {
  return dal.emailSent.create({
    to: encryptedEmail,
    type: emailType,
  })
}

//
//---------//
// Exports //
//---------//

export default createEmailSentRecordsAndRoom

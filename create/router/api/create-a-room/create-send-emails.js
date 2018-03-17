//---------//
// Imports //
//---------//

import sendEmail from 'server/email/send'

import { docidToHash } from 'server/db'
import { resolveAllProperties } from 'universal/utils'

//------//
// Main //
//------//

const createSendEmails = (player1Email, player2Email) => {
  return responses => {
    const {
      player1Data,
      player1EmailSentHash,
      player2Data,
      player2EmailSentHash,
      roomHash,
    } = responses

    const player1 = {
        email: player1Email,
        emailSentHash: player1EmailSentHash,
        hash: docidToHash(player1Data._id),
      },
      player2 = {
        email: player2Email,
        emailSentHash: player2EmailSentHash,
        hash: docidToHash(player2Data._id),
      }

    return resolveAllProperties({
      player1SendResult: send(player1, roomHash, 'youCreatedARoom'),
      player2SendResult: send(player2, roomHash, 'youAreInvited'),
    })
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function send(player, roomHash, templateName) {
  return sendEmail[templateName]({
    to: player.email,
    templateVariables: {
      emailSentHash: player.emailSentHash,
      playerHash: player.hash,
      roomHash,
    },
  })
}

//
//---------//
// Exports //
//---------//

export default createSendEmails

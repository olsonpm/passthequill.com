//---------//
// Imports //
//---------//

import dedent from 'dedent'

import createEmailSentRecords from './create-email-sent-records'
import createGameAndPlayers from './create-game-and-players'
import createSendEmails from './create-send-emails'
import ifNotUnsubscribed from './if-not-unsubscribed'
import * as rateLimit from './rate-limit'

import { isLaden } from 'fes'
import { encryptAllEmails } from 'server/email/encrypt'
import { dal } from 'server/db'
import { createIfRequestIsValid } from 'server/utils'
import { handleErrorDuringRoute } from '../helpers'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('createARoom'),
  optionsForGet = {
    allow404: true,
    returnRawResponse: true,
  }

//
//------//
// Main //
//------//

const post = ifRequestIsValid(ctx => {
  const { player1Email, player2Email } = ctx.request.body,
    handleError = handleErrorDuringRoute(ctx, createErrorMessage, [
      player1Email,
      player2Email,
    ])

  try {
    const sendEmails = createSendEmails(player1Email, player2Email)

    return encryptAllEmails([player1Email, player2Email])
      .then(getUnsubscribedTypes)
      .then(
        ifNotUnsubscribed([
          createEmailSentRecords,
          createGameAndPlayers,
          sendEmails,
        ])
      )
      .then(({ unsubscribedPlayers = [] }) => {
        ctx.status = 200

        const result = isLaden(unsubscribedPlayers)
          ? 'emails were not sent due to one or both players being unsubscribed'
          : 'emails sent successfully'

        ctx.body = {
          result,
          unsubscribedPlayers,
        }
      })
      .catch(handleError)
  } catch (error) {
    return handleError(error)
  }
})

function getUnsubscribedTypes(encryptedEmails) {
  const [player1EncryptedEmail, player2EncryptedEmail] = encryptedEmails

  return Promise.all([
    getEmailUnsubscriptionTypes(player1EncryptedEmail),
    getEmailUnsubscriptionTypes(player2EncryptedEmail),
    encryptedEmails,
  ])
}

function getEmailUnsubscriptionTypes(encryptedEmail) {
  return dal.emailUnsubscription
    .get({ _id: encryptedEmail }, optionsForGet)
    .then(response => {
      return response.status === 404 ? [] : response.data.types
    })
}

function createErrorMessage(player1Email, player2Email) {
  return encryptAllEmails([player1Email, player2Email]).then(
    ([player1EncryptedEmail, player2EncryptedEmail]) => {
      const friendly = 'creating a room',
        detailed = dedent(`
          An error occurred while creating a room
          player1EncryptedEmail: ${player1EncryptedEmail}
          player2EncryptedEmail: ${player2EncryptedEmail}
        `)

      return { detailed, friendly }
    }
  )
}

//
//---------//
// Exports //
//---------//

export default { post, rateLimit }

import unsubscribeViaEncryptedEmail from './via-encrypted-email'
import { dal, hashToDocid } from 'server/db'

const unsubscribeViaEmailSentHash = (emailSentHash, emailType) =>
  dal.emailSent
    .get({ _id: hashToDocid(emailSentHash) })
    .then(({ to: encryptedEmail }) =>
      unsubscribeViaEncryptedEmail(encryptedEmail, emailType)
    )

export default unsubscribeViaEmailSentHash

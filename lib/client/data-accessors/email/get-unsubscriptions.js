import api from 'client/api'

const getUnsubscriptions = emailSentHash =>
  api.get(`email/unsubscribed/${emailSentHash}`)

export default getUnsubscriptions

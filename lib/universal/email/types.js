//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { toCommaList } from '../utils'
import { containedIn } from 'fes'

//
//------//
// Init //
//------//

const validSendEmailTypes = ['invitation', 'room-created']

//
//------//
// Main //
//------//

const validEmailTypes = {
    send: new Set(validSendEmailTypes),
    unsubscribe: new Set(['all', ...validSendEmailTypes]),
  },
  isValidEmailType = {
    send: containedIn(validEmailTypes.send),
    unsubscribe: containedIn(validEmailTypes.unsubscribe),
  },
  approveEmailType = {
    send: approveSendEmailType,
    unsubscribe: approveUnsubscribeEmailType,
  }

//
//------------------//
// Helper Functions //
//------------------//

function approveSendEmailType(value) {
  if (!isValidEmailType.send(value)) {
    return tedent(`
      '${value}' is an invalid send email type
      email types available: ${toCommaList(validEmailTypes.send)}
    `)
  }
}

function approveUnsubscribeEmailType(value) {
  if (!isValidEmailType.unsubscribe(value)) {
    return tedent(`
      '${value}' is an invalid unsubscribe email type
      email types available: ${toCommaList(validEmailTypes.unsubscribe)}
    `)
  }
}

//
//---------//
// Exports //
//---------//

export { approveEmailType, isValidEmailType, validEmailTypes }

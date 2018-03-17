//---------//
// Imports //
//---------//

import { containedIn, mAppend, none } from 'fes'
import { sequentiallyResolveEach } from 'universal/utils'

//
//------//
// Init //
//------//

//
// the wording here is goofy because there's no such thing as subscribing to an
//   email, however 'not unsubscribed' is a double negative, so we're left with
//   two evils
//
const isSubscribedTo = {
  roomCreated: none(containedIn(['room-created', 'all'])),
  invitation: none(containedIn(['invitation', 'all'])),
}

//
//------//
// Main //
//------//

const ifNotUnsubscribed = asyncFunctions => {
  return responses => {
    const [
      player1UnsubscriptionTypes,
      player2UnsubscriptionTypes,
      encryptedEmails,
    ] = responses

    const player1 = {
        isSubscribed: isSubscribedTo.roomCreated(player1UnsubscriptionTypes),
      },
      player2 = {
        isSubscribed: isSubscribedTo.invitation(player2UnsubscriptionTypes),
      },
      bothAreSubscribed = player1.isSubscribed && player2.isSubscribed

    if (bothAreSubscribed)
      return sequentiallyResolveEach(asyncFunctions, encryptedEmails)

    const unsubscribedPlayers = []
    if (!player1.isSubscribed) mAppend('player1')(unsubscribedPlayers)
    if (!player2.isSubscribed) mAppend('player2')(unsubscribedPlayers)

    return { unsubscribedPlayers }
  }
}

//
//---------//
// Exports //
//---------//

export default ifNotUnsubscribed

//---------//
// Imports //
//---------//

import { sanitize } from '../helpers'
import { docidToHash } from 'server/db'

//
//------//
// Main //
//------//

const notifyOtherPlayer = {
  displayName: arg => {
    const { otherPlayer, updatedCurrentPlayer } = arg

    arg.ctx.state.websocketServer.maybeUpdateClient({
      playerHash: docidToHash(otherPlayer._id),
      data: {
        id: 'otherPlayerEnteredDisplayName',
        data: {
          commitOrDispatch: 'commit',
          type: 'room/updateOtherPlayer',
          payload: {
            otherPlayer: sanitize.player.other(updatedCurrentPlayer),
          },
        },
      },
    })

    return arg
  },
}

//
//---------//
// Exports //
//---------//

export { notifyOtherPlayer }

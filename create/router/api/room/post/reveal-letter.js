//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { combine, last, mAssignOver } from 'fes'
import { authorize, getOtherPlayerData, sanitize } from '../helpers'
import { createIfRequestIsValid, ifStatusIsNot404 } from 'server/utils'
import { promiseFlow } from 'universal/utils'
import {
  dal,
  docidToHash,
  pickIdAndRev,
  removeCouchdbProperties,
} from 'server/db'

//
//------//
// Init //
//------//

const ifRequestIsValid = createIfRequestIsValid('revealLetter')

//
//------//
// Main //
//------//

function createPostRevealLetter({ router, websocketServer }) {
  const revealLetter = createRevealLetter(websocketServer)

  router.post(
    '/:roomHash/player/:playerHash/reveal-letter',
    ifRequestIsValid(revealLetter)
  )
}

//
//------------------//
// Helper Functions //
//------------------//

function createRevealLetter(websocketServer) {
  return ctx => {
    const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

    return authorize(ctx)
      .then(
        ifStatusIsNot404(
          promiseFlow([getOtherPlayerData, revealLetterAndReturnOtherPlayer])
        )
      )
      .catch(handleError)
  }

  // helper function scoped to createRevealLetter

  function revealLetterAndReturnOtherPlayer({ ctx, otherPlayer }) {
    const playerIdAndRev = pickIdAndRev(otherPlayer),
      updatedOtherPlayer = removeCouchdbProperties(otherPlayer),
      { chosenLetter } = ctx.request.body,
      lastGuess = last(updatedOtherPlayer.guesses)

    mAssignOver(lastGuess)({ chosenLetter })

    return dal.player
      .update(combine(updatedOtherPlayer)(playerIdAndRev))
      .then(() => {
        websocketServer.maybeUpdateClient({
          playerHash: docidToHash(otherPlayer._id),
          data: {
            id: 'otherPlayerChoseLetter',
            data: {
              commitOrDispatch: 'commit',
              type: 'room/updateCurrentPlayer',
              payload: {
                currentPlayer: sanitize.player.current(updatedOtherPlayer),
              },
            },
          },
        })

        ctx.status = 200
        ctx.body = {
          otherPlayer: sanitize.player.other(updatedOtherPlayer),
        }
      })
  }
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params,
    { chosenLetter } = ctx.request.body

  return {
    friendly: 'marking your chosen letter',
    detailed: tedent(`
      error occurred during POST reveal-letter
        playerHash: ${playerHash}
        roomHash: ${roomHash}
        chosenLetter: ${chosenLetter}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostRevealLetter

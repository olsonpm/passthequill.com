//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { authorize, getCurrentPlayerData } from '../helpers'
import { createHandleErrorDuringRoute } from 'project-root/create/router/api/helpers'
import { promiseFlow } from 'universal/utils'
import { ifStatusIsNot404 } from 'server/utils'
import { dal } from 'server/db'

//
//------//
// Main //
//------//

function createPostDisableGuide({ router }) {
  router.post('/:roomHash/player/:playerHash/disable-guide', ctx => {
    const handleError = createHandleErrorDuringRoute(ctx, createErrorMessage)

    return authorize(ctx)
      .then(
        ifStatusIsNot404(
          promiseFlow([getCurrentPlayerData, disableGuideAndReturnResult])
        )
      )
      .catch(handleError)
  })
}

function disableGuideAndReturnResult({ ctx, currentPlayer }) {
  const { encryptedEmail } = currentPlayer

  return dal.guide
    .get({ _id: encryptedEmail })
    .then(guideData => {
      guideData.isActive = false

      return dal.guide.update(guideData)
    })
    .then(() => {
      ctx.body = { result: 'guide successfully disabled' }
      ctx.status = 200
    })
}

function createErrorMessage(ctx) {
  const { playerHash, roomHash } = ctx.params

  return {
    friendly: 'disabling your guide',
    detailed: tedent(`
      error occurred during POST disable-guide
        roomHash: ${roomHash}
        playerHash: ${playerHash}
    `),
  }
}

//
//---------//
// Exports //
//---------//

export default createPostDisableGuide

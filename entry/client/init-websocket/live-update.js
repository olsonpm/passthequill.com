//
// README
//   - The live-update websocket only receives updates.  I could have chosen to
//     update the server using a websocket instead of an http connection, but
//     I'm more familiar with http so I stuck with that.
//
// TODO: Figure out a good organization for the vuex modules.  The issue is the
//   room module is getting too big so I didn't want to tack on live-update
//   code.  However the live-updates don't hold any state of their own so
//   there's no good reason to separate it as its own vuex module.  For now I'm
//   just going to keep the event publishing and store mutations located here.
//

//---------//
// Imports //
//---------//

import vue from 'vue'

import { liveUpdateWebsocket } from 'project-root/config/app'
import { noop } from 'universal/utils'
import { assignOver, last, mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const idToMutatePayload = getIdToMutatePayload(),
  liveUpdateIds = getLiveUpdateIds()

//
//------//
// Main //
//------//

const init = ({ eventManager, store, playerHash, roomHash }) => {
  const liveUpdateWs = new WebSocket(liveUpdateWebsocket.url),
    idToHandleUpdate = getIdToHandleUpdate(eventManager, store)

  liveUpdateWs.onopen = () => {
    liveUpdateWs.send(
      JSON.stringify({
        id: 'initial-connection',
        data: {
          playerHash,
          roomHash,
        },
      })
    )
  }

  liveUpdateWs.onerror = event => {
    console.error('Error occurred in the liveUpdate WebSocket')
    console.error(event)
  }

  liveUpdateWs.onmessage = event => {
    const { id, data } = JSON.parse(event.data),
      handleUpdate = idToHandleUpdate[id]

    if (!handleUpdate) {
      throw new Error(`no handler for id: ${id}`)
    }
    handleUpdate(data)
  }

  return () => liveUpdateWs.close()
}

//
//------------------//
// Helper Functions //
//------------------//

function getLiveUpdateIds() {
  return new Set([
    'otherPlayerChoseLetter',
    'otherPlayerGuessed',
    'otherPlayerInitialized',
    'otherPlayerMarkedGuessAsInvalid',
    'otherPlayerMarkedGuessAsValid',
  ])
}

function getIdToMutatePayload() {
  return {
    otherPlayerGuessed: payload => {
      last(payload.otherPlayer.guesses).justAdded = true
    },
  }
}

function getIdToHandleUpdate(eventManager, store) {
  const injectEventManager = assignOver({ eventManager })

  return reduce(toHandlers, {})(liveUpdateIds)

  // helper function scoped to 'getIdToHandleUpdate'

  function toHandlers(idToHandleUpdate, id) {
    const upperFirstId = id[0].toUpperCase() + id.slice(1)

    return mSet(id, handleUpdate)(idToHandleUpdate)

    function handleUpdate(data) {
      const { commitOrDispatch, type, payload = {}, options = {} } = data

      if (commitOrDispatch === 'dispatch') {
        return store.dispatch(type, injectEventManager(payload), options)
      } else {
        // commitOrDispatch === 'commit'
        return eventManager
          .publish(`room/liveUpdate/before${upperFirstId}`)
          .then(() => {
            const mutatePayload = idToMutatePayload[id] || noop
            mutatePayload(payload)
            store.commit(type, payload, options)
            return vue.nextTick()
          })
          .then(() =>
            eventManager.publish(`room/liveUpdate/after${upperFirstId}`)
          )
      }
    }
  }
}

//
//---------//
// Exports //
//---------//

export default init

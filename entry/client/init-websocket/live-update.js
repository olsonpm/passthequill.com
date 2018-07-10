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
// TODO: Implement a clientSocketToDataQueue, where if a message can't be sent
//   due to the client temporarily being disconnected, then the data is sent
//   once the client comes back online and requests the queue.
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'
import vue from 'vue'

import { PersistentWebsocket } from 'persistent-websocket'
import { liveUpdateWebsocket } from 'project-root/config/app'
import { capitalizeFirstLetter, logErrorToServer } from 'universal/utils'
import { assignOver, mSet, reduce } from 'fes'

//
//------//
// Init //
//------//

const liveUpdateIds = getLiveUpdateIds(),
  normalClosure = 1000

//
//------//
// Main //
//------//

const init = ({ eventManager, store, playerHash, roomHash }) => {
  const liveUpdatePws = new PersistentWebsocket(liveUpdateWebsocket.url, {
      pingSendFunction: pws => pws.send('ping'),
      reachabilityTestUrl: '/ping',
    }),
    idToHandleUpdate = getIdToHandleUpdate(eventManager, store)

  liveUpdatePws.onopen = () => {
    liveUpdatePws.send(
      JSON.stringify({
        id: 'initial-connection',
        data: {
          playerHash,
          roomHash,
        },
      })
    )
  }

  liveUpdatePws.onerror = event => {
    logErrorToServer({
      context: 'in liveUpdate WebSocket onerror event',
      error: new Error(event),
      ignoreStack: true,
    })
  }

  liveUpdatePws.onclose = event => {
    if (event.code !== normalClosure) {
      const message = dedent(`
        abby-normal websocket close event received

        code: ${event.code}
        reason: ${event.reason || '(unknown)'}
      `)

      logErrorToServer({
        context: 'in liveUpdate WebSocket onclose event',
        error: new Error(message),
        ignoreStack: true,
      })
    }
  }

  liveUpdatePws.onmessage = event => {
    if (event.data === 'pong') return

    const { id, data } = JSON.parse(event.data),
      handleUpdate = idToHandleUpdate[id]

    if (!handleUpdate) {
      throw new Error(`no handler for id: ${id}`)
    }
    handleUpdate(data)
  }

  liveUpdatePws.open()

  return () => liveUpdatePws.close()
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
  ])
}

function getIdToHandleUpdate(eventManager, store) {
  const injectEventManager = assignOver({ eventManager })

  return reduce(toHandlers, {})(liveUpdateIds)

  // helper function scoped to 'getIdToHandleUpdate'

  function toHandlers(idToHandleUpdate, id) {
    const upperFirstId = capitalizeFirstLetter(id)

    return mSet(id, handleUpdate)(idToHandleUpdate)

    function handleUpdate(data) {
      const { commitOrDispatch, type, payload = {}, options = {} } = data

      if (commitOrDispatch === 'dispatch') {
        return store.dispatch(type, injectEventManager(payload), options)
      } else {
        // commitOrDispatch === 'commit'
        return eventManager
          .publish(`room/liveUpdate/before${upperFirstId}`, [{ payload }])
          .then(() => {
            store.commit(type, payload, options)
            return vue.nextTick()
          })
          .then(() =>
            eventManager.publish(`room/liveUpdate/after${upperFirstId}`, [
              { payload },
            ])
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

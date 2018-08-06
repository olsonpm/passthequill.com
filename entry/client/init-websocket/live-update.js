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

import tedent from 'tedent'
import vue from 'vue'

import { PersistentWebsocket } from 'persistent-websocket'
import { liveUpdateWebsocket } from 'project-root/config/app'
import { capitalizeFirstLetter, logErrorToServer } from 'universal/utils'
import { assignOver } from 'fes'

//
//------//
// Main //
//------//

const init = ({ eventManager, store, playerHash, roomHash }) => {
  const liveUpdatePws = new PersistentWebsocket(liveUpdateWebsocket.url, {
      pingSendFunction: pws => pws.send('ping'),
      reachabilityTestUrl: '/ping',
    }),
    handleUpdate = createHandleUpdate(eventManager, store)

  let downStartMs = 0

  liveUpdatePws.onopen = theEvent => {
    if (theEvent.wasReconnect) {
      logErrorToServer({
        context: "liveupdate websocket 'onopen' reconnect",
        error: new Error(`downtime ms: ${+new Date() - downStartMs}`),
        ignoreStack: true,
      })
    }

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

  liveUpdatePws.onclose = theEvent => {
    if (!theEvent.wasExpected) {
      downStartMs = +new Date()
    }

    const { code, reason } = theEvent
    if (code && code >= 4000 && code < 5000) {
      logErrorToServer({
        context: "liveupdate websocket 'onclose'",
        error: new Error(
          tedent(`
            code: ${code}
            reason: ${reason}
          `)
        ),
        ignoreStack: true,
      })
    }
  }

  liveUpdatePws.onmessage = event => {
    if (event.data === 'pong') return

    handleUpdate(JSON.parse(event.data))
  }

  liveUpdatePws.open()

  return () => liveUpdatePws.close()
}

//
//------------------//
// Helper Functions //
//------------------//

function createHandleUpdate(eventManager, store) {
  const injectEventManager = assignOver({ eventManager })

  //
  // currently the returned promises aren't followed up on because there's no
  //   need.  I just return promises out of habit - the alternative seems like
  //   a bug waiting to happen
  //
  return ({ id, data }) => {
    const upperFirstId = capitalizeFirstLetter(id),
      { commitOrDispatch, type, payload = {}, options = {} } = data

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

//
//---------//
// Exports //
//---------//

export default init

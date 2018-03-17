//
// README
//   - There is very likely another library that does what this will end up
//     doing, but I haven't figured out exactly what it needs to do and I have a
//     control problem.
//

//---------//
// Imports //
//---------//

import { resolveAll } from 'universal/utils'
import { apply, getArrayOfValues, map, passThrough } from 'fes'

//
//------//
// Main //
//------//

const createEventManager = () => {
  //
  // subscriptions is a two dimensional map.  The first key is the event id e.g.
  //   'some/nested1/event'.  The second key is a symbol used by the unsubscribe
  //   callback.  The value is the event callback.
  //
  const allSubscriptions = new Map()

  return {
    //
    // TODO: figure out a more semantic name than 'subscribe' which also implies
    //   returning an unsubscribe callback. hmmmm.
    //
    subscribeTo: (eventId, callback) => {
      let eventSubscriptions = allSubscriptions.get(eventId)

      if (!eventSubscriptions) {
        eventSubscriptions = new Map()
        allSubscriptions.set(eventId, eventSubscriptions)
      }

      const unsubscribeId = Symbol()
      eventSubscriptions.set(unsubscribeId, callback)

      return createUnsubscribeCallback(
        allSubscriptions,
        eventSubscriptions,
        eventId,
        unsubscribeId
      )
    },

    publish: (eventId, arrayOfArguments = []) => {
      const eventSubscriptions = allSubscriptions.get(eventId)
      if (!eventSubscriptions) return Promise.resolve([])

      return passThrough(eventSubscriptions, [
        getArrayOfValues,
        map(apply(arrayOfArguments)),
        resolveAll,
      ])
    },
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createUnsubscribeCallback(...args) {
  const [allSubscriptions, eventSubscriptions, eventId, unsubscribeId] = args

  return () => {
    eventSubscriptions.delete(unsubscribeId)
    if (eventSubscriptions.size === 0) {
      allSubscriptions.delete(eventId)
    }
  }
}

//
//---------//
// Exports //
//---------//

export default createEventManager

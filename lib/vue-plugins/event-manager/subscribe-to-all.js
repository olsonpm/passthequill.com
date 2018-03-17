//---------//
// Imports //
//---------//

import { getArrayOfValues, map, passThrough } from 'fes'

import flattenSubscribeTo from './flatten-subscribe-to'

//
//------//
// Main //
//------//

const subscribeToAll = (componentInstance, eventManager) => {
  const { subscribeTo } = componentInstance.$options

  const unsubscribeCallbacks = passThrough(subscribeTo, [
    flattenSubscribeTo,
    map(subscribe),
    getArrayOfValues,
  ])

  return unsubscribeCallbacks

  // scoped helper functions

  function subscribe(callback, eventId) {
    // subscribeTo returns an unsubscribe callback
    return eventManager.subscribeTo(eventId, callback.bind(componentInstance))
  }
}

//
//---------//
// Exports //
//---------//

export default subscribeToAll

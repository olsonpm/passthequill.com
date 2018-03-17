//
// README
//   - subscribeTo is an object declared as a property on a vue component.  It
//     will be structured similar to vuex modules allowing for nested
//     namespaces.  Flattening then turns this:
//
// {
//   subscribeTo: {
//     some: {
//       nested1: { event: () => console.log("I'm nested1 event!") },
//       nested2: { event: () => console.log("I'm nested2 event!") },
//     },
//     someRootEvent: () => console.log("I'm a root event!")
//   }
// }
//
// into
//
// {
//   'some/nested1/event': () => console.log("I'm nested1 event!")
//   'some/nested2/event': () => console.log("I'm nested2 event!")
//   'someRootEvent': () => console.log("I'm a root event!")
// }
//
// Note there is nothing stopping you from writing your subscriptions in the
//   flattened form.  I just personally prefer the object form because that's
//   a more accurate data representation for it.
//

//---------//
// Imports //
//---------//

import { append, join, reduce } from 'fes'

//
//------//
// Main //
//------//

const flattenSubscribeTo = subscribeTo =>
  recursivelyFlatten(subscribeTo, [], {})

//
//------------------//
// Helper Functions //
//------------------//

//
// Here value will either be a
//   function: the callback to be ran when the subscribed event is published
//   or an object: a namespaced key/value pair where the values will again
//                 either be functions or objects
//
// The path is the recursed set of keys which, when a function value is found,
//   are joined appropriately to create the flat string event id
//
// The result will be an object of the flattened event ids to their callbacks
//
function recursivelyFlatten(value, path, result) {
  if (typeof value === 'function') {
    result[join('/')(path)] = value
  } else {
    // typeof value === 'object'
    result = reduce((innerResult, value, key) => {
      const updatedPath = append(key)(path)
      return recursivelyFlatten(value, updatedPath, innerResult)
    }, result)(value)
  }
  return result
}

//
//---------//
// Exports //
//---------//

export default flattenSubscribeTo

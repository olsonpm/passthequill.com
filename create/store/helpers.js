//---------//
// Imports //
//---------//

import typeDetect from 'type-detect'
import { reduce } from 'fes'

//
//------//
// Main //
//------//

const assignAllLeaves = state => updatedState => {
  return reduce(toUpdatedState, state)(updatedState)
}

//
//------------------//
// Helper Functions //
//------------------//

function toUpdatedState(resultState, updatedValue, keyToUpdate) {
  const previousValue = resultState[keyToUpdate]

  if (isArray(updatedValue)) {
    const shouldKeepTraversing =
      isObject(previousValue) && isObject(updatedValue)

    resultState[keyToUpdate] = shouldKeepTraversing
      ? reduce(toUpdatedState, previousValue)(updatedValue)
      : updatedValue
  } else if (isObject(updatedValue)) {
    resultState[keyToUpdate] = reduce(toUpdatedState, previousValue)(
      updatedValue
    )
  } else {
    resultState[keyToUpdate] = updatedValue
  }

  return resultState
}

function isArray(value) {
  return typeDetect(value) === 'Array'
}
function isObject(value) {
  return typeDetect(value) === 'Object'
}

//
//---------//
// Exports //
//---------//

export { assignAllLeaves }

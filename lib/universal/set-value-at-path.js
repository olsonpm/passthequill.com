//
// README
//   - This is an old implementation I wrote that "works".  I need to rewrite it
//     using my current conventions
//

//---------//
// Imports //
//---------//

import dedent from 'dedent'
import { join } from 'fes'

import truncate from './truncate'

//
//------//
// Init //
//------//

const setOfAssignableTypes = new Set(['object', 'function'])

//
//------//
// Main //
//------//

const setValueAtPath = (propertyPath, val) => object => {
  // not sure what the desired case would be for an empty propertyPath, so
  //   throwing an error until I encounter it
  if (!propertyPath.length) {
    throw new Error(
      dedent(`
        setValueAtPath requires a laden path
        propertyPath: JSON.stringify(propertyPath, null, 2)
      `)
    )
  }

  let i = 0,
    shouldCheckForKey = true,
    tmpObject = object

  while (i < propertyPath.length - 1) {
    const key = propertyPath[i]

    if (!shouldCheckForKey) {
      if (i < propertyPath.length - 1) {
        tmpObject = tmpObject[key] = {}
      } else if (i === propertyPath.length - 1) {
        tmpObject[key] = val
      }
    } else {
      if (!hasKey(key, tmpObject) || tmpObject[key] === undefined) {
        if (i < propertyPath.length - 1) {
          tmpObject = tmpObject[key] = {}
          shouldCheckForKey = false
        } else if (i === propertyPath.length - 1) {
          tmpObject[key] = val
        }
      } else {
        if (!setOfAssignableTypes.has(typeof tmpObject[key])) {
          throw new Error(
            dedent(`
              setValueAtPath was given a path containing an unassignable key

              propertyPath: ${join(', ')(propertyPath)}
              unassignable key: ${key}
              value at key: ${truncate(tmpObject[key])}
              typeof value at key: ${typeof tmpObject[key]}
              assignable types: ${join(', ')(setOfAssignableTypes)}
            `)
          )
        }

        tmpObject = tmpObject[key]
      }
    }

    i += 1
  }

  tmpObject[propertyPath[i]] = val

  return object
}

//
//------------------//
// Helper Functions //
//------------------//

function hasKey(key, anObject) {
  return (
    isAnObject(anObject) && (anObject[key] !== undefined || key in anObject)
  )
}

function isAnObject(anObject) {
  return typeof anObject === 'object' && anObject !== null
}

//
//---------//
// Exports //
//---------//

export default setValueAtPath

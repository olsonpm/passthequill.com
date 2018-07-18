//---------//
// Imports //
//---------//

import tedent from 'tedent'

import { capitalizeFirstLetter, jstring } from 'universal/utils'
import { discardAll, forEach, getValueAtPath, join } from 'fes'
import {
  approveDataAnimate,
  approveRefOrElement,
  getDataAnimate,
  validValues,
} from './helpers'

//
//------//
// Main //
//------//

const approveInput = (ref, showOrHide) => {
  const animateFn = 'animate' + capitalizeFirstLetter(showOrHide)

  const { element, maybeErrorMessage } = approveRefOrElement(
    ref,
    'ref',
    animateFn
  )

  if (maybeErrorMessage) return maybeErrorMessage

  const result = approveDataAnimate(element, 'ref', animateFn)

  if (result.maybeErrorMessage) return result.maybeErrorMessage

  const { elementWithDataAnimate } = result

  const animateData = getDataAnimate(elementWithDataAnimate),
    opacityDuration = getValueAtPath(['duration', 'opacity'])(animateData)

  if (typeof opacityDuration === 'object') {
    const unexpectedKeys = discardAll(['onHide', 'onShow'])(
      Object.keys(opacityDuration)
    )

    if (unexpectedKeys.length) {
      return tedent(`
        element has unexpected keys passed to 'duration.opacity'
          given: ${join(', ')(unexpectedKeys)}
          allowed: onHide, onShow
      `)
    }

    forEach((value, key) => {
      if (!validValues.duration.set.has(value)) {
        return tedent(`
          element does not have a correct 'duration.opacity[${key}]'
            given: ${jstring(value)}
            allowed: ${validValues.duration.string}
        `)
      }
    })(opacityDuration)
  } else {
    // durationOpacity is probably a string
    if (!validValues.duration.set.has(opacityDuration)) {
      return tedent(`
        ${animateFn} called on an element without a correct 'duration.opacity'
          given: ${jstring(opacityDuration)}
          allowed: ${validValues.duration.string}
      `)
    }
  }

  return { animateData, element, opacityDuration }
}

//
//---------//
// Exports //
//---------//

export default approveInput

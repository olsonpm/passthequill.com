//
// TODO: validate duration more thoroughly
//

//---------//
// Imports //
//---------//

import animate from 'velocity-animate'

import { capitalizeFirstLetter } from 'universal/utils'
import {
  createForcefedTransitions,
  createSetToRenderedValue,
  getDuration,
  heightAndWidth,
} from './helpers'
import {
  alwaysReturn as justReturn,
  combineAll,
  forEach,
  getArrayOfValues,
  isEmpty,
  isTruthy,
  keepWhen,
  map,
  passThrough,
} from 'fes'

//
//------//
// Main //
//------//

const maybeAnimateSize = (element, showOrHide, animateData) => {
  const sizeDuration = animateData.duration.size,
    { shouldAnimate } = animateData,
    getTransitions = createGetTransitions(element, showOrHide)

  const transitions = passThrough(shouldAnimate, [
    keepWhen(isTruthy),
    map(getTransitions),
    getArrayOfValues,
    combineAll.objects,
  ])

  if (isEmpty(transitions)) return Promise.resolve()

  if (!sizeDuration) {
    const animateFn = 'animate' + capitalizeFirstLetter(showOrHide)
    throw new Error(
      `${animateFn} called on an element without 'duration.size' declared`
    )
  }

  if (showOrHide === 'show') {
    removeExistingStyles(element, transitions)
  }

  const duration = getDuration(animateData.duration.size, showOrHide)

  return animate(element, transitions, { duration })
}

//
//------------------//
// Helper Functions //
//------------------//

function removeExistingStyles(element, transitions) {
  forEach((_unused_value, propName) => {
    element.style[propName] = null
  })(transitions)
}

function createGetTransitions(element, showOrHide) {
  const setToRenderedValue = createSetToRenderedValue(element),
    setToZero = justReturn('0px'),
    [initFrom, initTo] =
      showOrHide === 'show'
        ? [setToZero, setToRenderedValue]
        : [setToRenderedValue, setToZero]

  return function getTransitions(_unused_value, heightOrWidth) {
    const props = heightAndWidth.propEnums[heightOrWidth],
      from = map(initFrom)(props),
      to = map(initTo)(props)

    return createForcefedTransitions(from, to)
  }
}

//
//---------//
// Exports //
//---------//

export default maybeAnimateSize

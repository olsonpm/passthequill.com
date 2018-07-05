//---------//
// Imports //
//---------//

import animate from 'velocity-animate'

import durationEnum from '../duration-enum'
import getData from '../get-data'

import { capitalizeFirstLetter } from 'universal/utils'
import {
  alwaysReturn as justReturn,
  combineAll,
  forEach,
  getArrayOfValues,
  isEmpty,
  isTruthy,
  keepWhen,
  map,
  mSet,
  passThrough,
  reduceFresh,
  startsWith,
} from 'fes'

//
//------//
// Init //
//------//

const propEnums = getPropEnums()

//
//------//
// Main //
//------//

const createMaybeAnimateSize = (element, showOrHide) => {
  const animateData = getData(element, 'animate'),
    sizeDuration = animateData.duration.size,
    { shouldAnimate = {} } = animateData,
    getTransitions = createGetTransitions(element, showOrHide)

  const transitions = passThrough(shouldAnimate, [
    keepWhen(isTruthy),
    map(getTransitions),
    getArrayOfValues,
    combineAll.objects,
  ])

  if (isEmpty(transitions)) return () => Promise.resolve()

  if (!sizeDuration) {
    const animateFn = 'animate' + capitalizeFirstLetter(showOrHide)
    throw new Error(
      `${animateFn} called on an element without 'animate-duration-size' declared`
    )
  }

  if (showOrHide === 'show') {
    removeExistingStyles(element, transitions)
  }

  const duration = getDuration(animateData.duration.size, showOrHide)

  return function animateSize() {
    return animate(element, transitions, { duration })
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function getDuration(sizeDuration, showOrHide) {
  let result

  if (typeof sizeDuration === 'object') {
    const onShowOrHide = 'on' + capitalizeFirstLetter(showOrHide)
    result = durationEnum[sizeDuration[onShowOrHide]]
  } else {
    result = durationEnum[sizeDuration]
  }

  return result
}

function removeExistingStyles(element, transitions) {
  forEach((_unused_value, propName) => {
    element.style[propName] = null
  })(transitions)
}

//
// propEnums is just propLists with key/value pairs instead of arrays.  The
//   values are the same as the keys in this enum. e.g.
//
// the purpose of this property is to enable the simpler transform 'map' instead
//   of using the less predictable 'reduce'
//
// {
//   height: {
//     height: 'height',
//     borderTopWidth: 'borderTopWidth',
//     ...
//   }
// }
//
function getPropEnums() {
  const propLists = getPropLists()

  return map(reduceFresh(toEnum, createObject))(propLists)
}

function createObject() {
  return {}
}

function createForcefedTransitions(from, to) {
  return map(toForcefedTransition)(from)

  // scoped helper functions

  function toForcefedTransition(fromValue, key) {
    const toValue = to[key]
    return [toValue, fromValue]
  }
}

function createGetTransitions(element, showOrHide) {
  const setToRenderedValue = createSetToRenderedValue(element),
    setToZero = justReturn('0px'),
    [initFrom, initTo] =
      showOrHide === 'show'
        ? [setToZero, setToRenderedValue]
        : [setToRenderedValue, setToZero]

  return function getTransitions(_unused_value, heightOrWidth) {
    const props = propEnums[heightOrWidth],
      from = map(initFrom)(props),
      to = map(initTo)(props)

    return createForcefedTransitions(from, to)
  }
}

function createSetToRenderedValue(element) {
  const computedStyle = window.getComputedStyle(element),
    domRect = element.getBoundingClientRect()

  return function setToRenderedValue(propName) {
    return startsWith('margin')(propName)
      ? computedStyle[propName]
      : `${domRect[propName]}px`
  }
}

function getPropLists() {
  return {
    height: ['height', 'marginTop', 'marginBottom'],
    width: ['width', 'marginRight', 'marginLeft'],
  }
}

function toEnum(result, propName) {
  return mSet(propName, propName)(result)
}

//
//---------//
// Exports //
//---------//

export default createMaybeAnimateSize

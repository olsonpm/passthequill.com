//
// README
//   - adjust currently assumes an element is modifying its dimensions based off
//     the existence of a single other element.
//   - also I know this file isn't used yet.  It will help in the future though
//     so I'm leaving it in for now.
//

//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import tedent from 'tedent'

import { combine, discardWhen, getValueAtPath, isEmpty, map } from 'fes'
import {
  approveDataAnimate,
  approveRefOrElement,
  createForcefedTransitions,
  createSetToRenderedValue,
  getDataAnimate,
  getDuration,
  heightAndWidth,
} from './helpers'

//
//------//
// Main //
//------//

const adjust = (refOrElement, dependentRefOrElement, showOrHide) => {
  return Promise((resolve, reject) => {
    try {
      const {
        dataAnimate,
        dependentElement,
        element,
        maybeErrorMessage,
      } = approveInput(refOrElement, dependentRefOrElement, showOrHide)

      if (maybeErrorMessage) return reject(new Error(maybeErrorMessage))

      const transitions = getTransitions(
        element,
        dependentElement,
        showOrHide,
        dataAnimate
      )

      if (isEmpty(transitions)) return resolve()

      const { duration } = dataAnimate
      return animate(element, transitions, { duration })
    } catch (e) {
      reject(e)
    }
  })
}

//
//------------------//
// Helper Functions //
//------------------//

function approveInput(refOrElement, dependentRefOrElement, showOrHide) {
  if (showOrHide !== 'show' && showOrHide !== 'hide') {
    return {
      maybeErrorMessage: tedent(`
        adjust was given an invalid 'showOrHide'
          showOrHide: ${showOrHide}
      `),
    }
  }

  // eslint-disable-next-line prefer-const
  const { element, maybeErrorMessage } = approveRefOrElement(
    refOrElement,
    'refOrElement',
    'expand'
  )

  if (maybeErrorMessage) return { maybeErrorMessage }

  let result = approveRefOrElement(
    dependentRefOrElement,
    'dependentRefOrElement',
    'expand'
  )

  if (result.maybeErrorMessage) return result

  const { element: dependentElement } = result

  result = approveDataAnimate(dependentElement, 'dependentElement', 'adjust')

  if (result.maybeErrorMessage) return result

  const { elementWithDataAnimate } = result

  const animateData = getDataAnimate(elementWithDataAnimate),
    durationKey = getValueAtPath(['duration', 'size'])(animateData),
    duration = getDuration(durationKey, showOrHide)

  if (!duration) {
    return {
      maybeErrorMessage: tedent(`
        depdendent element has animation data but an invalid size duration
          duration.size: ${durationKey}
          called from: adjust
      `),
    }
  }

  return { dependentElement, element, duration }
}

function getTransitions(element, dependentElement, showOrHide, dataAnimate) {
  const { height, width } = heightAndWidth.propEnums

  const flatPropEnums = combine(height)(width),
    setToRenderedValue = createSetToRenderedValue(element),
    initFrom = map(setToRenderedValue)(flatPropEnums)

  const revert = showOrHideDependentElement(
    dependentElement,
    showOrHide,
    dataAnimate
  )

  const initTo = map(setToRenderedValue)(flatPropEnums)

  revert()

  const transitions = createForcefedTransitions(initFrom, initTo)

  return discardWhen(noMovement)(transitions)
}

function noMovement([to, from]) {
  return to === from
}

//
// Not sure what a good name for this function would be - but it returns a
//  'revert' function which reverts the changes it made.
//
function showOrHideDependentElement(dependentElement, showOrHide, dataAnimate) {
  const { style } = dependentElement,
    { afterHide } = dataAnimate

  let revert

  if (showOrHide === 'show') {
    if (style.display === 'none') {
      style.display = null
      revert = () => {
        style.display = 'none'
      }
    } else if (style.visibility === 'hidden') {
      style.visibility = null
      style.opacity = null

      revert = () => {
        style.visibility = 'hidden'
        style.opacity = '0'
      }
    }
  } else {
    if (!afterHide) {
      throw new Error(
        'Unexpected state occurred: afterHide is not declared on data-animate'
      )
    }

    if (afterHide === 'setDisplayNone') {
      style.display = 'none'
      revert = () => {
        style.display = null
      }
    } else {
      // afterHide === 'makeInvisible'
      style.visibility = 'hidden'
      style.opacity = '0'

      revert = () => {
        style.visibility = null
        style.opacity = null
      }
    }
  }

  return revert
}

//
//---------//
// Exports //
//---------//

export default adjust

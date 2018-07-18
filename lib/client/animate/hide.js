//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import tedent from 'tedent'

import maybeAnimateSize from './maybe-animate-size'

import { callEach } from 'universal/utils'
import { getDuration, stopCurrentAnimation, validValues } from './helpers'

//
//------//
// Main //
//------//

const hide = ({ animateData, element, opacityDuration }) => {
  const maybeErrorMessage = approveInput(animateData)
  if (maybeErrorMessage) return Promise.reject(new Error(maybeErrorMessage))

  const duration = getDuration(opacityDuration, 'hide'),
    fromOpacity = element.style.opacity || 1,
    opacity = [0, fromOpacity]

  stopCurrentAnimation(element)

  return animate(element, { opacity }, { duration })
    .then(() => maybeAnimateSize(element, 'hide', animateData))
    .then(() =>
      callEach({ animateData, element }, [
        handleAfterHide,
        addClassHidden,
        removeClassShown,
      ])
    )
}

//
//------------------//
// Helper Functions //
//------------------//

//
// so far 'animateData' is the only property needing approval here
//
function approveInput(animateData) {
  const { afterHide } = animateData
  if (!validValues.afterHide.set.has(afterHide)) {
    return tedent(`
      animateHide called on an element without a correct 'afterHide' value
        given: ${afterHide}
        allowed: ${validValues.afterHide.string}
    `)
  }
}

function addClassHidden({ element }) {
  element.classList.add('animate_hidden')
}
function removeClassShown({ element }) {
  element.classList.remove('animate_shown')
}

function handleAfterHide({ animateData, element }) {
  const { afterHide } = animateData
  if (afterHide === 'makeInvisible') element.style.visibility = 'hidden'
  else {
    /* afterHide === 'setDisplayNone' */
    element.style.display = 'none'
  }
}

//
//---------//
// Exports //
//---------//

export default hide

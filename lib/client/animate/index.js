//
// TODO: Handle promises better.  Below is some home-made promise spaghetti
// TODO: remove dataAnimateOverride and instead allow for a more
//       customizable configuration
//

//---------//
// Imports //
//---------//

import approveInput from './approve-input'
import hide from './hide'
import show from './show'

import { stopCurrentAnimation } from './helpers'

//
//------//
// Main //
//------//

const animateHide = createAnimate('hide'),
  animateHideWithOverride = createAnimate('hide', true),
  animateShow = createAnimate('show'),
  animateShowWithOverride = createAnimate('show', true)

//
//------------------//
// Helper Functions //
//------------------//

function createAnimate(showOrHide, maybeWithOverride) {
  return (ref, dataAnimateOverride) =>
    new Promise((resolve, reject) => {
      try {
        const result = approveInput(ref, showOrHide)
        if (typeof result === 'string') return reject(new Error(result))

        const { element, opacityDuration } = result,
          animateShowOrHide = showOrHide === 'show' ? show : hide

        const animateData = maybeWithOverride
          ? dataAnimateOverride || result.animateData
          : result.animateData

        animateData.shouldAnimate = animateData.shouldAnimate || {}

        return animateShowOrHide({
          animateData,
          element,
          opacityDuration,
        })
          .then(() => resolve())
          .catch(reject)
      } catch (e) {
        return reject(e)
      }
    })
}

//
//---------//
// Exports //
//---------//

export {
  animateHide,
  animateHideWithOverride,
  animateShow,
  animateShowWithOverride,
  stopCurrentAnimation,
}

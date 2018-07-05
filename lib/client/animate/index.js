//
// TODO: Figure out whether scoping animation data would make sense here.  The
//   api I have in mind is to utilize something like jquery's `closest`
//
//   https://api.jquery.com/closest/
//
//   where it looks for the closest 'data-animate' attribute.  This would remove
//   boilerplate while still being declarative - as opposed to tucking defaults
//   away in the javascript.
//
//
// TODO: Handle promises better.  Below is some home-made promise spaghetti
//

//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import dedent from 'dedent'

import createMaybeAnimateSize from './create-maybe-animate-size'
import durationEnum from '../duration-enum'
import getData from '../get-data'

import { capitalizeFirstLetter } from 'universal/utils'
import { forEach, getValueAtPath } from 'fes'

//
//------//
// Init //
//------//

const defaultBeforeShowStyles = { opacity: 0, visibility: 'visible' },
  defaultAfterHideStyles = { visibility: 'hidden' }

//
//------//
// Main //
//------//

const stopCurrentAnimation = elementToStop => {
  animate(elementToStop, 'stop', true)
}

const animateHide = createAnimate('hide')

const animateShow = createAnimate('show')

//
//------------------//
// Helper Functions //
//------------------//

function createAnimate(showOrHide) {
  return ref =>
    new Promise((resolve, reject) => {
      try {
        const element = ref._isVue ? ref.$el : ref,
          animateFn = 'animate' + capitalizeFirstLetter(showOrHide)

        if (!element) {
          // TODO: figure out a better error message here.  For instance if it's a
          //   vue element then we should let the dev know its element doesn't
          //   exist yet
          return reject(
            new Error(`${animateFn} called on a non-existent element`)
          )
        }

        const animateData = getData(element, 'animate')
        if (!animateData) {
          return reject(
            new Error(
              `${animateFn} called on an element without 'data-animate'`
            )
          )
        }

        const opacityDuration = getValueAtPath(['duration', 'opacity'])(
          animateData
        )
        if (!opacityDuration) {
          const error = new Error(
            dedent(`
              ${animateFn} called on an element without a correct 'duration.opacity'
                declared in the data-animate attribute
            `)
          )
          return reject(error)
        }

        const create =
          showOrHide === 'show' ? createAnimateShow : createAnimateHide

        return create({
          element,
          opacityDuration,
        }).then(() => resolve())
      } catch (e) {
        reject(e)
      }
    })
}

function getDuration(opacityDuration, onShowOrHide) {
  return typeof opacityDuration === 'object'
    ? durationEnum[opacityDuration[onShowOrHide]]
    : durationEnum[opacityDuration]
}

function createAnimateShow({ element, opacityDuration }) {
  const duration = getDuration(opacityDuration, 'onShow'),
    opacity = [1, 0],
    animateOpacity = () => animate(element, { opacity }, { duration })

  stopCurrentAnimation(element)
  assignStyles(element, defaultBeforeShowStyles)
  element.classList.add('exists')

  const maybeAnimateSize = createMaybeAnimateSize(element, 'show')

  return maybeAnimateSize().then(animateOpacity)
}

//
// TODO: implement dom types in fes!
//
function assignStyles(element, styles) {
  forEach((value, key) => {
    element.style[key] = value
  })(styles)
}

function createAnimateHide({ element, opacityDuration }) {
  const duration = getDuration(opacityDuration, 'onHide'),
    fromOpacity = element.style.opacity || 1,
    opacity = [0, fromOpacity],
    maybeAnimateSize = createMaybeAnimateSize(element, 'hide')

  stopCurrentAnimation(element)

  return animate(element, { opacity }, { duration })
    .then(maybeAnimateSize)
    .then(() => {
      element.classList.remove('exists')
      assignStyles(element, defaultAfterHideStyles)
    })
}

//
//---------//
// Exports //
//---------//

export { animateHide, animateShow, stopCurrentAnimation }

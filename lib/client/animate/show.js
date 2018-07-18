//---------//
// Imports //
//---------//

import animate from 'velocity-animate'

import maybeAnimateSize from './maybe-animate-size'

import { getDuration, heightAndWidth, stopCurrentAnimation } from './helpers'
import {
  flatten,
  forEach,
  getArrayOfValues,
  map,
  mAppendAll,
  passThrough,
  pickAll,
} from 'fes'

//
//------//
// Init //
//------//

const defaultBeforeShowStyles = getDefaultBeforeShowStyles()

//
//------//
// Main //
//------//

const show = ({ animateData, element, opacityDuration }) => {
  const duration = getDuration(opacityDuration, 'show'),
    opacity = [1, 0],
    animateOpacity = () => animate(element, { opacity }, { duration }),
    cleanStyles = createCleanStyles({ animateData, element })

  stopCurrentAnimation(element)
  assignStyles(element, defaultBeforeShowStyles)
  element.classList.remove('animate_hidden')
  element.classList.add('animate_shown')

  return maybeAnimateSize(element, 'show', animateData)
    .then(animateOpacity)
    .then(cleanStyles)
}

//
//------------------//
// Helper Functions //
//------------------//

function createCleanStyles({ animateData, element }) {
  const remove = createRemoveStyle(element)

  return () => passThrough(animateData, [getStylesToRemove, forEach(remove)])
}

function createRemoveStyle(element) {
  return aStyle => {
    element.style[aStyle] = null
  }
}

function getStylesToRemove(animateData) {
  const heightAndWidthStylesToRemove = passThrough(animateData.shouldAnimate, [
    pickAll(['height', 'width']),
    map((_unusedVal, key) => heightAndWidth.propLists[key]),
    getArrayOfValues,
    flatten,
  ])

  return mAppendAll(['opacity', 'visibility'])(heightAndWidthStylesToRemove)
}

//
// TODO: implement dom types in fes!
//
function assignStyles(element, styles) {
  forEach((value, key) => {
    element.style[key] = value
  })(styles)
}

function getDefaultBeforeShowStyles() {
  return {
    display: null,
    opacity: 0,
    visibility: 'visible',
  }
}

//
//---------//
// Exports //
//---------//

export default show

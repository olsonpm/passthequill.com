//---------//
// Imports //
//---------//

import velocityAnimate from 'velocity-animate'

import { applyTo, assignOver, map, mAppendTo, mMap, passThrough } from 'fes'

//
//------//
// Main //
//------//

//
// `.then(noop)` can be removed after velocity returns real promises
// https://github.com/julianshapiro/velocity/issues/868
//
const animate = (...args) => {
  args = normalizeAnimateArguments(args)
  return velocityAnimate(...args)
}

const animateAll = listOfAnimateArgs =>
  passThrough(listOfAnimateArgs, [
    map(normalizeAnimateArguments),
    mMap(applyTo(animate)),
    arrayOfRealPromises => Promise.all(arrayOfRealPromises),
  ])

const animateHide = (el, duration) =>
  animate(el, { opacity: [0, 1] }, { duration })

const animateShow = (el, duration) =>
  animate(el, { opacity: [1, 0] }, { duration })

const domRectToObject = domRect => {
  const { top, right, bottom, left, width, height, x, y } = domRect

  return { top, right, bottom, left, width, height, x, y }
}

const durations = { fast: 300, normal: 400, slow: 1000 }

const getPreviousSibling = anElement => {
  const parent = anElement.parentNode
  let previousSibling

  for (const child of parent.childNodes) {
    if (child === anElement) break

    if (child.nodeType === Node.ELEMENT_NODE) previousSibling = child
  }

  return previousSibling
}

const getSiblingElements = anElement => {
  const parent = anElement.parentNode,
    siblingElements = [],
    addSibling = mAppendTo(siblingElements)

  for (const child of parent.childNodes) {
    if (child !== anElement && child.nodeType === Node.ELEMENT_NODE)
      addSibling(child)
  }

  return siblingElements
}

//
// 'key' must match the values in mdn's list
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
//
// returns a disposer function
//
const onKeyUp = (key, fn) => {
  const handleKeyUp = e => {
    if (e.key === key) fn(e)
  }
  document.body.addEventListener('keyup', handleKeyUp)

  return () => document.body.removeEventListener('keyup', handleKeyUp)
}

const onBlur = (el, handleBlur) => {
  el.addEventListener('blur', handleBlur)
  return () => el.removeEventListener('blur', handleBlur)
}

const removeFocus = fromElement => {
  if (fromElement === document.activeElement) fromElement.blur()
}

const stopCurrentAnimation = elementToStop => {
  velocityAnimate(elementToStop, 'stop', true)
}

//
//------------------//
// Helper Functions //
//------------------//

function normalizeAnimateArguments([element, animations, options = {}]) {
  options = assignOver({ duration: durations.fast })(options)
  return [element, animations, options]
}

//
//---------//
// Exports //
//---------//

export {
  animate,
  animateAll,
  animateHide,
  animateShow,
  domRectToObject,
  durations,
  getPreviousSibling,
  getSiblingElements,
  onBlur,
  onKeyUp,
  removeFocus,
  stopCurrentAnimation,
}

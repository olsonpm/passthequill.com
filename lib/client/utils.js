//---------//
// Imports //
//---------//

import velocityAnimate from 'velocity-animate'

import durationEnum from './duration-enum'

import { applyTo, assignOver, map, mAppendTo, mMap, passThrough } from 'fes'

//
//------//
// Main //
//------//

//
// `.then(noop)` can be removed after velocity returns real promises
// https://github.com/julianshapiro/velocity/issues/868
//
const animate = (...args) =>
  new Promise((resolve, reject) => {
    try {
      args = normalizeAnimateArguments(args)
      return velocityAnimate(...args)
        .then(result => resolve(result))
        .catch(error => reject(error))
    } catch (e) {
      reject(e)
    }
  })

const animateAll = listOfAnimateArgs =>
  new Promise((resolve, reject) => {
    try {
      const aPromise = passThrough(listOfAnimateArgs, [
        map(normalizeAnimateArguments),
        mMap(applyTo(animate)),
        arrayOfRealPromises => Promise.all(arrayOfRealPromises),
      ])

      return aPromise
        .then(result => resolve(result))
        .catch(error => reject(error))
    } catch (e) {
      reject(e)
    }
  })

const domRectToObject = domRect => {
  const { top, right, bottom, left, width, height, x, y } = domRect

  return { top, right, bottom, left, width, height, x, y }
}

const getDistanceFromTopOfPage = anElement => {
  let yPosition = 0

  while (anElement) {
    const { clientTop, offsetTop, scrollTop } = anElement
    yPosition += offsetTop - scrollTop + clientTop
    anElement = anElement.offsetParent
  }

  return yPosition
}

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

const onBlur = (el, handleBlur) => {
  el.addEventListener('blur', handleBlur)
  return () => el.removeEventListener('blur', handleBlur)
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

const removeFocus = fromElement => {
  if (fromElement === document.activeElement) fromElement.blur()
}

//
//------------------//
// Helper Functions //
//------------------//

function normalizeAnimateArguments([element, animations, options = {}]) {
  options = assignOver({ duration: durationEnum.fast })(options)
  return [element, animations, options]
}

//
//---------//
// Exports //
//---------//

export * from './animate'

export {
  animate,
  animateAll,
  domRectToObject,
  durationEnum,
  getDistanceFromTopOfPage,
  getPreviousSibling,
  getSiblingElements,
  onBlur,
  onKeyUp,
  removeFocus,
}

//---------//
// Imports //
//---------//

import animate from 'velocity-animate'
import json5 from 'json5'
import tedent from 'tedent'

import durationEnum from '../duration-enum'

import { capitalizeFirstLetter } from 'universal/utils'
import { join, map, mSet, reduceFresh, startsWith } from 'fes'

//
//------//
// Main //
//------//

const approveDataAnimate = (element, argName, fnName) => {
  const elementWithDataAnimate = element.closest('[data-animate]')

  if (!elementWithDataAnimate) {
    return {
      maybeErrorMessage: tedent(`
       '${argName}' has no ancestor (including self) with the
         attribute 'data-animate'

         called from: ${fnName}
     `),
    }
  }
  return { elementWithDataAnimate }
}

const approveRefOrElement = (refOrElement, argName, fnName) => {
  if (!refOrElement) {
    return {
      maybeErrorMessage: tedent(`
        The argument '${argName}' cannot be falsey in ${fnName}
          ${argName}: ${refOrElement}
      `),
    }
  }

  const element = refOrElement._isVue ? refOrElement.$el : refOrElement

  if (!element) {
    return {
      maybeErrorMessage: tedent(`
        '${argName}' refers to a vue component that hasn't been bound
          in function: ${fnName}
          component tag: ${refOrElement.$options._componentTag}
      `),
    }
  }

  return { element }
}

const createForcefedTransitions = (from, to) => {
  return map(toForcefedTransition)(from)

  // scoped helper functions

  function toForcefedTransition(fromValue, key) {
    const toValue = to[key]
    return [toValue, fromValue]
  }
}

const createSetToRenderedValue = element => {
  const computedStyle = window.getComputedStyle(element),
    domRect = element.getBoundingClientRect()

  return function setToRenderedValue(propName) {
    return startsWith('margin')(propName) || startsWith('padding')(propName)
      ? computedStyle[propName]
      : `${domRect[propName]}px`
  }
}

const getDataAnimate = element => {
  const dataString = element.dataset.animate

  return !dataString ? undefined : json5.parse(dataString)
}

const getDuration = (durationKey, showOrHide) => {
  const onShowOrHide = `on${capitalizeFirstLetter(showOrHide)}`

  return typeof durationKey === 'object'
    ? durationEnum[durationKey[onShowOrHide]]
    : durationEnum[durationKey]
}

const heightAndWidth = getHeightAndWidthInfo()

const stopCurrentAnimation = elementToStop => {
  animate(elementToStop, 'stop', true)
}

const validValues = getValidValues()

//
//------------------//
// Helper Functions //
//------------------//

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
function getHeightAndWidthInfo() {
  const propLists = {
    height: [
      'height',
      'marginTop',
      'marginBottom',
      'paddingTop',
      'paddingBottom',
    ],
    width: [
      'width',
      'marginRight',
      'marginLeft',
      'paddingLeft',
      'paddingRight',
    ],
  }

  return {
    propEnums: map(reduceFresh(toEnum, createObject))(propLists),
    propLists,
  }
}

function toEnum(result, propName) {
  return mSet(propName, propName)(result)
}

function createObject() {
  return {}
}

function getValidValues() {
  return map(toSetAndString)({
    duration: new Set(Object.keys(durationEnum)),
    afterHide: new Set(['makeInvisible', 'setDisplayNone']),
  })
}

function toSetAndString(setOfValues) {
  return {
    set: setOfValues,
    string: join(', ')(setOfValues),
  }
}

//
//---------//
// Exports //
//---------//

export {
  approveDataAnimate,
  approveRefOrElement,
  createForcefedTransitions,
  createSetToRenderedValue,
  getDataAnimate,
  getDuration,
  heightAndWidth,
  stopCurrentAnimation,
  validValues,
}

//---------//
// Imports //
//---------//

import {
  forEach,
  getArrayOfKeys,
  isLaden,
  isTruthy as valueIsTruthy,
  keepWhen,
  map,
  mAssignOver,
  passThrough,
  prepend,
} from 'fes'

//
//------//
// Main //
//------//

const client = {
  'initial-classes': {
    bind(element, { value: classNameToShouldAddClass }) {
      const classes = getClassesToAdd(classNameToShouldAddClass)
      forEach(addClass)(classes)

      return

      // scoped helper functions

      function addClass(className) {
        element.classList.add(className)
      }
    },
  },
  'show-initially': {
    bind(element, { value }) {
      element.style.opacity = value ? 1 : 0
      element.style.visibility = value ? 'visible' : 'hidden'
    },
  },
}

const ssr = {
  'initial-classes': (vnodeWithData, vnodeDirective) => {
    const { value: classNameToShouldAddClass } = vnodeDirective,
      classes = getClassesToAdd(classNameToShouldAddClass)

    if (isLaden(classes)) addClassesToVnode(classes, vnodeWithData)
  },
  'show-initially': (vnodeWithData, vnodeDirective) => {
    const { value } = vnodeDirective,
      styles = value
        ? { opacity: 1, visibility: 'visible' }
        : { opacity: 0, visibility: 'hidden' }

    addStylesToVNode(styles, vnodeWithData)
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function addClassesToVnode(classes, vnode) {
  const { data } = vnode
  data.staticClass = data.staticClass || ''
  data.staticClass += map(prepend(' '))(classes)
}

//
// This code is ripped from:
//   https://github.com/vuejs/vue/blob/52719ccab8fccffbdf497b96d3731dc86f04c1ce/src/platforms/web/server/directives/show.js
//
function addStylesToVNode(styles, vnode) {
  const currentVNodeStyle = vnode.data.style || (vnode.data.style = {})

  if (Array.isArray(currentVNodeStyle)) {
    currentVNodeStyle.push(styles)
  } else {
    mAssignOver(currentVNodeStyle)(styles)
  }
}

function getClassesToAdd(classNameToShouldAddClass) {
  return passThrough(classNameToShouldAddClass, [
    keepWhen(valueIsTruthy),
    getArrayOfKeys,
  ])
}

//
//---------//
// Exports //
//---------//

export default { client, ssr }

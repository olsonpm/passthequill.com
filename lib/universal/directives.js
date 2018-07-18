//---------//
// Imports //
//---------//

import { forEach, mAssignOver } from 'fes'

//
//------//
// Main //
//------//

const client = {
  'initially-hidden': addClientStylesIfTruthy({
    visibility: 'hidden',
    opacity: 0,
  }),
  'initially-removed': addClientStylesIfTruthy({ display: 'none' }),
}

//
// custom ssr directives must be used on dom elements (not vue components) until
//   this issue is fixed:
//   https://github.com/vuejs/vue/issues/8551
//
const ssr = {
  'initially-hidden': addSsrStylesIfTruthy({
    visibility: 'hidden',
    opacity: 0,
  }),
  'initially-removed': addSsrStylesIfTruthy({ display: 'none' }),
}

//
//------------------//
// Helper Functions //
//------------------//

function addClientStylesIfTruthy(styles) {
  return {
    bind(element, { expression, value }) {
      if (value || expression === undefined)
        forEach((val, key) => (element.style[key] = val))(styles)
    },
  }
}

function addSsrStylesIfTruthy(styles) {
  return (vnodeWithData, vnodeDirective) => {
    const { expression, value } = vnodeDirective
    if (value || expression === undefined)
      addStylesToVNode(styles, vnodeWithData)
  }
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

//
//---------//
// Exports //
//---------//

export default { client, ssr }

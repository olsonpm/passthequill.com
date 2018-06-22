//---------//
// Imports //
//---------//

import { mAssignOver } from 'fes'

//
//------//
// Main //
//------//

const client = {
  'show-initially': {
    bind(el, { value }) {
      el.style.opacity = value ? 1 : 0
      el.style.visibility = value ? 'visible' : 'hidden'
    },
  },
}

const ssr = {
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

//
// This code is ripped from:
// dev branch
//   https://github.com/vuejs/vue/blob/dev/src/platforms/web/server/directives/show.js
// future-proof link (commit at time of copy)
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

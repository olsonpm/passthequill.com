<script>
//
// TODO: refactor (simplify) this code.  It's doing toooo much :(
//

//---------//
// Imports //
//---------//

import { animate, animateShow, durations, stopCurrentAnimation } from 'client/utils'
import { setValueAtPath } from 'universal/utils'
import { map } from 'fes'

//
//------//
// Main //
//------//

export default {
  name: 'can-fade',
  props: {
    alwaysRender: {
      default: false,
      type: Boolean,
    },
    shouldAnimateHeight: {
      default: false,
      type: Boolean,
    },
    shouldAnimateWidth: {
      default: false,
      type: Boolean,
    },
    shouldAnimateSlowly: {
      default: false,
      type: Boolean,
    },
    showInitially: {
      default: true,
      type: Boolean,
    },
  },
  render(createElement) {
    const { $slots, alwaysRender, exists, state } = this,
      elementToRender = exists ? $slots.default[0] : createElement()

    if (!state.isVisible && alwaysRender) {
      setValueAtPath(['data', 'style', 'opacity'], 0)(elementToRender)
    }

    return elementToRender
  },
  data() {
    return {
      state: {
        //
        // TODO: find a better name than 'isVisible' which implies height may
        //   be involved (isVisible is set to false after both opacity _and_
        //   height are done animating)
        //
        isVisible: this.showInitially,
      },
    }
  },
  computed: {
    duration() {
      return this.shouldAnimateSlowly ? durations.slow : durations.fast
    },
    exists() {
      return this.alwaysRender || this.state.isVisible
    },
  },
  methods: {
    animateHide() {
      const { $el, duration, state } = this

      stopCurrentAnimation($el)

      const fromOpacity = $el.style.opacity || 1

      return animate($el, { opacity: [0, fromOpacity] }, { duration })
        .then(() => Promise.all([
          this.maybeAnimateHeight('hide'),
          this.maybeAnimateWidth('hide'),
        ]))
        .then(() => {
          state.isVisible = false
        })
    },
    animateShow() {
      const { $nextTick, state } = this

      const wasActive = state.exists
      state.isVisible = true

      return wasActive ? show(this) : $nextTick().then(() => show(this))

      // scoped helper function

      function show(thisComponent) {
        const { $el, duration } = thisComponent

        $el.style.opacity = 0

        stopCurrentAnimation($el)

        return Promise.all([
            thisComponent.maybeAnimateHeight('show'),
            thisComponent.maybeAnimateWidth('show'),
          ])
          .then(() => animateShow($el, duration))
      }
    },
    maybeAnimateHeight(showOrHide) {
      const { $el, duration, shouldAnimateHeight } = this

      if (!shouldAnimateHeight) return Promise.resolve()

      const to = {},
        from = {},
        computedStyle = window.getComputedStyle($el)

      if (showOrHide === 'show') {
        //
        // TODO: make this more concise
        //   ** do I really need to make fes work with dom types? :(
        //
        from.height = 0
        from.paddingTop = 0
        from.paddingBottom = 0
        from.marginTop = 0
        from.marginBottom = 0
        from.borderTopWidth = 0
        from.borderBottomWidth = 0
        $el.style.height = null
        $el.style.paddingTop = null
        $el.style.paddingBottom = null
        $el.style.marginTop = null
        $el.style.marginBottom = null
        $el.style.borderTopWidth = null
        $el.style.borderTopWidth = null
        to.height = computedStyle.height
        to.paddingTop = computedStyle.paddingTop
        to.paddingBottom = computedStyle.paddingBottom
        to.marginTop = computedStyle.marginTop
        to.marginBottom = computedStyle.marginBottom
        to.borderTopWidth = computedStyle.borderTopWidth
        to.borderBottomWidth = computedStyle.borderBottomWidth
      } else {
        // hide
        to.height = 0
        to.paddingTop = 0
        to.paddingBottom = 0
        to.marginTop = 0
        to.marginBottom = 0
        to.borderTopWidth = 0
        to.borderBottomWidth = 0
        from.height = computedStyle.height
        from.paddingTop = computedStyle.paddingTop
        from.paddingBottom = computedStyle.paddingBottom
        from.marginTop = computedStyle.marginTop
        from.marginBottom = computedStyle.marginBottom
        from.borderTopWidth = computedStyle.borderTopWidth
        from.borderBottomWidth = computedStyle.borderBottomWidth
      }

      const animations = map(toAnimations(to))(from)

      return animate($el, animations, { duration })
    },
    maybeAnimateWidth(showOrHide) {
      const { $el, shouldAnimateWidth } = this

      if (!shouldAnimateWidth) return Promise.resolve()

      const to = {},
        from = {},
        computedStyle = window.getComputedStyle($el)

      if (showOrHide === 'show') {
        //
        // TODO: make this more concise
        //   ** do I really need to make fes work with dom types? :(
        //
        from.width = 0
        from.paddingRight = 0
        from.paddingLeft = 0
        from.marginRight = 0
        from.marginLeft = 0
        from.borderRightWidth = 0
        from.borderLeftWidth = 0
        $el.style.width = null
        $el.style.paddingRight = null
        $el.style.paddingLeft = null
        $el.style.marginRight = null
        $el.style.marginLeft = null
        $el.style.borderRightWidth = null
        $el.style.borderLeftWidth = null
        to.width = computedStyle.width
        to.paddingRight = computedStyle.paddingRight
        to.paddingLeft = computedStyle.paddingLeft
        to.marginRight = computedStyle.marginRight
        to.marginLeft = computedStyle.marginLeft
        to.borderRightWidth = computedStyle.borderRightWidth
        to.borderLeftWidth = computedStyle.borderLeftWidth
      } else {
        // hide
        to.width = 0
        to.paddingRight = 0
        to.paddingLeft = 0
        to.marginRight = 0
        to.marginLeft = 0
        to.borderRightWidth = 0
        to.borderLeftWidth = 0
        from.width = computedStyle.width
        from.paddingRight = computedStyle.paddingRight
        from.paddingLeft = computedStyle.paddingLeft
        from.marginRight = computedStyle.marginRight
        from.marginLeft = computedStyle.marginLeft
        from.borderRightWidth = computedStyle.borderRightWidth
        from.borderLeftWidth = computedStyle.borderLeftWidth
      }

      const animations = map(toAnimations(to))(from)

      //
      // TODO: make this dynamic using a sensible api.  Right now only two
      //   components animate width so this hard-coded hack is fine.
      //
      return animate($el, animations, { duration: durations.fast })
    },
    setIsVisible(value) {
      this.state.isVisible = value
    }
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function toAnimations(to) {
  return (fromVal, key) => [to[key], fromVal]
}
</script>

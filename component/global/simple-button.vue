<template>
  <button type="button"
    class="simple-button"
    :class="{ 'custom-focus': hasCustomStyledFocus }"
    @click.capture.stop.prevent="onClickWrapper"
    v-initial-classes="initialClasses"
    v-show-initially="showInitially">

    <slot />
  </button>
</template>

<script>
import { removeFocus } from 'client/utils'

export default {
  name: 'simple-button',
  created() {
    this.removeFocusOnMouseClick = anEvent => {
      //
      // TODO: spend more time looking for a less hacky hack that differentiates
      //   between a mouse click and a click caused by some other means e.g.
      //   spacebar or enter.
      //
      if (anEvent.x || anEvent.y) removeFocus(this.$el)
    }
  },
  mounted() {
    this.$el.addEventListener('click', this.removeFocusOnMouseClick, true)
  },
  beforeDestroy() {
    this.$el.removeEventListener('click', this.removeFocusOnMouseClick, true)
  },
  data: () => ({
    state: {
      clicked: false
    },
  }),
  props: {
    canOnlyClickOnce: {
      type: Boolean,
      default: false,
    },
    hasCustomStyledFocus: {
      type: Boolean,
      default: false,
    },
    initialClasses: {
      default: () => ({})
    },
    onClick: {},
    showInitially: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClickWrapper() {
      const { canOnlyClickOnce, state } = this

      if (!canOnlyClickOnce) this.onClick()
      else if (!state.wasClicked) {
        state.wasClicked = true
        this.onClick()
      }
    }
  },
}
</script>

<style lang="scss">
.simple-button {
  line-height: 0;
  position: relative;

  label,
  p {
    line-height: $default-line-height;
  }

  &:not(.custom-focus)::before {
    background-color: transparent;
    bottom: 0;
    box-shadow: 0 0 0 transparent;
    content: '';
    display: inline-block;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    transition-duration: $duration-tiny;
    transition-property: background-color, box-shadow, transform;
    transition-timing-function: $easing-default;

    // TODO: find a better way to style focus when using the keyboard but not
    //   a mouse.  This transition delay fixes a flash of focus styling before
    //   focus is removed upon a mouse click.
    transition-delay: 50ms;

  }
  &:not(.custom-focus):focus::before {
    bottom: 0;
    box-shadow: 0 0 5px $info-blue-focus;
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transform: scale(1.2);
  }
}
</style>

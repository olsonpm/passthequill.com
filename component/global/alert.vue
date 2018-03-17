<template>
  <can-fade ref="canFadeComponent"
    :show-initially="showInitially"
    :should-animate-slowly="shouldAnimateSlowly"
    :should-animate-width="shouldAnimateWidth">

    <svg viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      stroke-width="0"
      class="alert">

      <circle cx="12" cy="12" r="12" />
      <line x1="12" y1="7.5" x2="12" y2="12.5" />
      <line x1="12" y1="17.5" x2="12" y2="17.5" />
    </svg>
  </can-fade>
</template>

<script>
export default {
  name: 'alert',
  props: {
    shouldAnimateSlowly: {
      default: false,
      type: Boolean,
    },
    shouldAnimateWidth: {
      default: false,
      type: Boolean
    },
    showInitially: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    animateHide() {
      return this.$refs.canFadeComponent.animateHide()
    },
    animateShow() {
      return this.$refs.canFadeComponent.animateShow()
    },
    setIsVisible(value) {
      this.$refs.canFadeComponent.setIsVisible(value)
    }
  },
}
</script>

<style lang="scss">
svg.alert {
  color: $fg;
  cursor: pointer;
  display: inline-block;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  margin-top: -2px;
  vertical-align: middle;

  &.warn {
    fill: $yellow-warn;
  }
  &.error {
    fill: $error-red;
  }

  > line {
    stroke: $bg;
    stroke-width: 3.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>

<template>
  <!--
    TODO: set the default fill to quill-blue for :not(.with-border)
  -->
  <svg viewBox="0 0 24 24"
    width="27"
    height="27"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="help-circle"
    :class="{ 'with-border': withBorder }">

    <circle class="enclosing-circle"
      cx="12"
      cy="12"
      :stroke-width="borderWidth"
      :r="radius" />

    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />

    <circle fill="currentColor"
      stroke-width="0"
      cx="12"
      cy="17"
      r="1.3" />
  </svg>
</template>

<script>
export default {
  name: 'help-circle',
  props: {
    withBorder: {
      type: Boolean,
    },
  },
  computed: {
    borderWidth() {
      return this.withBorder ? 2 : 0
    },
    radius() {
      return this.withBorder ? 10 : 12
    },
  },
}
</script>

<style lang="scss">
svg.help-circle {
  vertical-align: middle;

  &:not(.with-border) {
    filter: drop-shadow(0 2px 2px $shadow-gray-default);
  }
}
</style>

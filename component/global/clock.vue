<template>
  <svg viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="emoji clock"
    :class="{ 'with-border': withBorder }">

    <!--
      TODO: separate this into two components
    -->

    <circle cx="12" cy="12"
      :r="radius"
      :stroke-width="borderWidth" />

    <polyline :points="clockHandPoints"
      :stroke-width="clockHandWidth" />
  </svg>
</template>

<script>
export default {
  name: 'clock',
  props: {
    withBorder: {
      type: Boolean,
    },
  },
  computed: {
    borderWidth() {
      return this.withBorder ? 2 : 0
    },
    clockHandPoints() {
      return this.withBorder ? '12 6 12 12 16 14'
        : '12 5 12 12 17.5 14'
    },
    clockHandWidth() {
      return this.withBorder ? 2 : 2.8
    },
    radius() {
      return this.withBorder ? 10 : 12
    },
  },
}
</script>

<style lang="scss">
svg.clock {
  vertical-align: middle;

  &:not(.with-border) {
    cursor: pointer;
    filter: drop-shadow(0 2px 2px $shadow-gray-default);

    > circle {
      fill: $quill-blue;
    }

    > polyline {
      stroke: $bg;
    }
  }
}
</style>

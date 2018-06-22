<template>
  <simple-button can-only-click-once
    :on-click="onClick">

    <svg viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      class="check-circle">

      <circle cx="12" cy="12" r="12" stroke-width="0" />
      <polyline class="check" points="19 7 9 17 5 13" />
    </svg>
  </simple-button>
</template>

<script>
export default {
  name: 'check-circle',
  props: ['on-click'],
}
</script>

<style lang="scss">
svg.check-circle {
  display: inline-block;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  vertical-align: middle;

  > circle {
    fill: $green;
  }

  > polyline {
    stroke: $bg;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>

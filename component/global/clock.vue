<template>
  <simple-button class="clock"
    :on-click="onClick">
    
    <svg viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="emoji clock">

      <circle cx="12" cy="12"
        r="12"
        stroke-width="0" />

      <polyline points="12 5 12 12 17.5 14"
        stroke-width="2.8" />
    </svg>
  </simple-button>
</template>

<script>
export default {
  name: 'clock',
  props: ['on-click'],
}
</script>

<style lang="scss">
svg.clock {
  cursor: pointer;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  vertical-align: middle;

  > circle {
    fill: $quill-blue;
  }

  > polyline {
    stroke: $bg;
  }
}
</style>

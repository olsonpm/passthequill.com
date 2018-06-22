<template>
  <simple-button can-only-click-once
    :on-click="onClick">

    <svg viewBox="0 0 24 24"
      width="24"
      height="24"
      class="cancel">

      <circle cx="12" cy="12" r="12" stroke-width="0" />
      <line x1="7" y1="17" x2="17" y2="7" stroke-width="2" />
    </svg>
  </simple-button>
</template>

<script>
export default {
  name: 'cancel',
  props: ['onClick'],
}
</script>

<style lang="scss">
svg.cancel {
  display: inline-block;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  vertical-align: middle;

  > circle {
    fill: $error-red;
  }

  > line {
    stroke: $bg;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>

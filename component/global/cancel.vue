<template>
  <svg viewBox="0 0 24 24"
    width="24"
    height="24"
    class="cancel">

    <circle cx="12" cy="12" r="12" stroke-width="0" />
    <line x1="7" y1="17" x2="17" y2="7" stroke-width="2" />
  </svg>
</template>

<script>
export default {
  name: 'cancel',
}
</script>

<style lang="scss">
svg.cancel {
  cursor: pointer;
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

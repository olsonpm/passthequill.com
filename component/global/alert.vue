<template>
  <!--
    README
     - because this component will always be clickable I'd wrap it in a button.
       However it is used in 'failure-link.vue' alongside some text explaining
       the error - where both the text and alert are wrapped in a button, so I'm
       letting the consumer handle wrapping alerts in a button.
  -->
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
</template>

<script>
export default {
  name: 'alert',
}
</script>

<style lang="scss">
svg.alert {
  color: $fg;
  display: inline-block;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);

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

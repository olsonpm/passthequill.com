<template>
  <simple-button class="arrow-circle"
    :on-click="onClick"
    :show-initially="showInitially">

    <svg viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="arrow-circle"
      :class="[direction, { pulsate }]">

      <circle cx="12" cy="12" r="12" stroke-width="0" />
      <circle cx="12" cy="12" r="12" stroke-width="0" />

      <template v-if="direction === 'right'">
        <polyline points="13 17 17.5 12 13 7"
          stroke-width="2.5" />

        <line x1="6.5" y1="12" x2="17.5" y2="12"
          stroke-width="2.7" />
      </template>

      <template v-else-if="direction === 'left'">
        <polyline points="11 7 6.5 12 11 17"
          stroke-width="2.5" />
        <line x1="17.5" y1="12" x2="6.5" y2="12"
          stroke-width="2.7" />
      </template>
    </svg>
  </simple-button>
</template>

<script>
export default {
  name: 'arrow-circle',
  props: {
    direction: {},
    onClick: {},
    pulsate: {},
    showInitially: {
      default: true,
    },
  },
}
</script>

<style lang="scss">
svg.arrow-circle {
  -webkit-tap-highlight-color: transparent;
  color: $bg;
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  overflow: visible;

  > circle {
    fill: $quill-blue;

    &:first-child {
      display: none;
    }
  }

  &.pulsate > circle:first-child {
    display: inline;
    animation: pulsateAnimation_arrowCircle 1.4s infinite;

    transform-origin: center;
    transition-property: transform, opacity;
    transition-timing-function: $easing-default;
  }
}

@keyframes pulsateAnimation_arrowCircle {
  from {
    opacity: 0.8;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.9);
  }
}
</style>

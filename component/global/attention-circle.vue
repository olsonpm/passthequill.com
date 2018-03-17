<template>
  <span class="attention-circle"
    ref="attentionCircleEl">

    <span class="pulsating-circle" />
  </span>
</template>

<script>
import { setValueAtPath } from 'universal/utils'
import { animateHide, animateShow, durations } from 'client/utils'

const duration = durations.slow

export default {
  name: 'attention-circle',
  props: ['pulsate'],
  methods: {
    animateHide() {
      return animateHide(this.$refs.attentionCircleEl, duration)
    },
    animateShow() {
      return animateShow(this.$refs.attentionCircleEl, duration)
    },
    setIsVisible(value) {
      const opacity = (value) ? 1 : 0
      setValueAtPath(['style', 'opacity'], opacity)(this.$refs.attentionCircleEl)
    }
  },
}
</script>

<style lang="scss">
// TODO: figure out a better color scheme.  Local (unshared) colors feel dirty.
$attention-circle-color: #ff8d00;

.attention-circle {
  background-color: $attention-circle-color;
  border-color: transparent;
  border-radius: 100px;
  display: inline-block;
  height: 14px;
  opacity: 0;
  width: 14px;

  > .pulsating-circle {
    animation: pulsateAnimation_attentionCircle 1.4s infinite;
    background-color: $attention-circle-color;
    border-color: transparent;
    border-radius: 100px;
    display: inline-block;
    height: 14px;
    transform-origin: center;
    transition-property: transform, opacity;
    transition-timing-function: $easing-default;
    width: 14px;

    // TODO: figure out why this is necessary.  CSS is hard :(
    position: relative;
    top: -6px;
  }
}

@keyframes pulsateAnimation_attentionCircle {
  from {
    opacity: 0.8;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
</style>

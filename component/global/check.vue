<template>
  <can-fade ref="canFadeComponent"
    :show-initially="showInitially">

    <svg viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="check">

      <polyline points="20 6 9 17 4 12" />
    </svg>
  </can-fade>
</template>

<script>
export default {
  name: 'check',
  props: ['showInitially'],
  methods: {
    animateHide() {
      const { canFadeComponent } = this.$refs
      return canFadeComponent.animateHide()
    },
    animateShow() {
      const { canFadeComponent } = this.$refs
      return canFadeComponent.animateShow()
    },
  },
}
</script>

<template>
  <svg viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="close-x">

    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</template>

<script>
export default {
  name: 'close-x',
}
</script>

<style lang="scss">
svg.close-x {
  cursor: pointer;
}
</style>

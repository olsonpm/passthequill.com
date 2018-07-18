<template>
  <svg viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="check"
    v-initially-hidden="initiallyHidden">

    <polyline points="20 6 9 17 4 12" />
  </svg>
</template>

<script>
export default {
  name: 'check',
  props: {
    initiallyHidden: {
      default: false,
    },
  },
}
</script>

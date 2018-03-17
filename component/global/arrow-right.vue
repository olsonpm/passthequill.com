<template>
  <svg viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="arrow-right" >

    <polyline points="13 18 19 12 13 6" :stroke-width="3.3" />
    <line x1="5" y1="12" x2="19" y2="12" :stroke-width="3.3" />
  </svg>
</template>

<script>
export default {
  name: 'arrow-right',
}
</script>

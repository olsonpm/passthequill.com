<template>
  <svg viewBox="0 0 24 24"
    width="42"
    height="42"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="emoji teardrop">

    <circle cx="12" cy="12" r="10" />
    <path d="M9 17.5s1-1.5 3-1.5 3 1.5 3 1.5" />
    <circle cx="8.5" cy="8" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8" r="1.4" fill="currentColor" stroke="none" />
    <path class="the-drop"
      d="M7 10s-1.25 2-1.25 2.5c0 .75.5 1.25 1.25 1.25s1.25-.5 1.25-1.25C8.25 12 7 10 7 10z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
</template>

<script>
export default {
  name: 'teardrop',
}
</script>

<style lang="scss">
.emoji.teardrop {
  > .the-drop {
    fill: $quill-blue;
  }
}
</style>

<template>
  <svg viewBox="0 0 24 24"
    width="27"
    height="27"
    fill="none"
    class="help-circle">

    <circle class="enclosing-circle"
      cx="12"
      cy="12"
      stroke-width="0"
      r="12" />

    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" />

    <circle class="question-mark-dot"
      stroke-width="0"
      cx="12"
      cy="17"
      r="1.3" />
  </svg>
</template>

<script>
export default {
  name: 'help-circle',
}
</script>

<style lang="scss">
svg.help-circle {
  filter: drop-shadow(0 2px 2px $shadow-gray-default);
  vertical-align: middle;

  > .enclosing-circle {
    fill: $quill-blue;
  }

  > path {
    stroke: $bg;
  }

  > .question-mark-dot {
    fill: $bg;
  }
}
</style>

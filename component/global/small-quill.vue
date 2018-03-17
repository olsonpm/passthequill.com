<template>
  <svg viewbox="0 0 24 24"
    shape-rendering="geometricPrecision"
    class="small-quill">

    <path class="outer-stem"
      d="M10.53 24l-.364-5.698"
      stroke-width="1" />

    <path class="feather"
      d="M19.53 0c-1.9 4.287-2.442 13.425-2.442 13.425L13.53 14l2.321 2.31S12.53 19 10.53 19c-2 0-5-7-5-7s5.277-11.575 14-12z"
      stroke-width="0" />

    <path class="inner-stem"
      d="M10.752 16.625c-2.703-1.31-.08-8.988 5.165-13.465-3.052 4.188-6.15 10.095-5.165 13.465z" />
  </svg>
</template>

<script>
export default {
  name: 'small-quill',
}
</script>

<style lang="scss">
.small-quill {
  height: 24px;
  width: 24px;

  > .outer-stem {
    stroke: $fg;
  }

  > .feather {
    fill: $fg;
  }

  > .inner-stem {
    fill: $bg;
  }
}
</style>

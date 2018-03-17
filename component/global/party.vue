<template>
  <svg viewBox="0 0 24 24"
    width="38"
    height="38"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    class="emoji party">

    <path class="cone-color"
      d="M2 22l3-12c-.536 2 5.333 7 7 6zm10-6c1.732-1-6.464-8-7-6"
      stroke-width="1"
    />
    <path class="color5" d="M12 11s5.548-9 10-9" stroke-width="1" />
    <path class="color2" d="M7.715 9.282s-2-3-1-4 3 0 4-1-.64-3-.64-3" stroke-width="1" />
    <path class="color1"
      d="M19.056 6.512l1.415-1.414 1.414 1.414-1.414 1.415z"
      fill="currentColor"
      stroke="none"
    />
    <path class="color2"
      d="M4.9 1.821L6.316.407l1.414 1.414-1.414 1.415z"
      fill="currentColor"
      stroke="none"
    />
    <path class="color3" d="M10 7h2v2h-2z" fill="currentColor" stroke="none" />
    <path class="color4" d="M13 14s3 1 4 0 1-2 2-3 4 1 4 1" stroke-width="1" />
    <circle class="color1" r="1" cx="13.885" cy="1.813" fill="currentColor" stroke="none" />
    <circle class="color2" r="1" cy="9.982" cx="16.045" fill="currentColor" stroke="none" />
    <circle class="color4" r="1" cx="4.517" cy="6.548" fill="currentColor" stroke="none" />
    <circle class="color3" r="1" cy="15.108" cx="22.137" fill="currentColor" stroke="none" />
  </svg>
</template>

<script>
export default {
  name: 'party',
}
</script>

<style lang="scss">
.emoji.party {
  @include res-aware-element-spacing('margin-left', 'sm');

  .color1 {
    color: $info-blue-focus;
  }
  .color2 {
    color: $error-red-dark;
  }
  .color3 {
    color: $orange;
  }
  .color4 {
    color: $green;
  }
  .color5 {
    color: $purple;
  }
  .cone-color {
    color: darken($info-blue-focus, 10%);
  }
}
</style>

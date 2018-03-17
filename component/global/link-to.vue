<template>
  <a class="link-to"
    :class="[customFocus, { 'custom-focus': customFocus }]"
    v-bind:href="url"
    target="_blank">

    <span><slot /></span>
  </a>
</template>

<script>
export default {
  name: 'link-to',
  props: ['custom-focus', 'url'],
}
</script>

<style lang="scss">
.link-to {
  display: inline-block;
  line-height: $default-line-height;
  position: relative;

  &::before {
    background-color: transparent;
    bottom: 0;
    box-shadow: 0 0 0 transparent;
    content: '';
    display: inline-block;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    transition-duration: $duration-tiny;
    transition-property: background-color, box-shadow, transform;
    transition-timing-function: $easing-default;
  }

  > span {
    position: relative;
  }

  &:focus {
    outline: none;
  }

  &:focus::before {
    bottom: 0;
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transform: scale(1.2);
  }

  &:not(.custom-focus):focus {
    &::before {
      box-shadow: 0 0 5px $info-blue-focus;
    }
  }
}
</style>

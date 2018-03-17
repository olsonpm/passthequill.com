<template>
  <div class="unexpected-error error">
    <h5>{{ friendlyMessage }}</h5>

    <teardrop />

    <help-with-unexpected-error />
  </div>
</template>

<script>
export default {
  name: 'unexpected-error',
  computed: {
    friendlyMessage() {
      return this.$store.state.unexpectedError.friendlyMessage
    },
  },
}
</script>

<style lang="scss">
.unexpected-error {
  > .teardrop {
    @include res-aware-element-spacing('margin-top', 'sm');
    @include res-aware-element-spacing('margin-bottom', 'md');
    display: block;
  }
}
</style>

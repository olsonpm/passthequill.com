<template>
  <div class="more-info_unsubscribe-all info">
    <p>
      If you unsubscribe to 'All' emails then you will never receive an
      automated email from passthequill.com
    </p>
    <teardrop />
  </div>
</template>

<script>
export default {
  name: 'more-info_unsubscribe-all',
}
</script>

<style lang="scss">
.more-info_unsubscribe-all {
  .teardrop {
    @include res-aware-element-spacing('margin-top', 'xs');
  }
}
</style>

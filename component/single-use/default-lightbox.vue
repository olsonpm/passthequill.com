<template>
  <div class="default-lightbox" v-html="content" :class="[type]" />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('lightbox')

export default {
  name: 'default-lightbox',
  computed: mapState(['content', 'type']),
}
</script>

<style lang="scss">
.default-lightbox {
  svg.close-x {
    cursor: pointer;
  }

  text-align: left;

  p + ul {
    @include res-aware-element-spacing('margin-top', 'xs');
  }
}
</style>

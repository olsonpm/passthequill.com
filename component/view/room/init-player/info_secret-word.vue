<template>
  <div class="init-player-info_secret-word info">
    <h3>Secret Word</h3>

    <ul class="bulleted">
      <li>Must be 5 letters</li>
      <li>Letters must be unique</li>
      <li>Must be a real word</li>
    </ul>

    <p v-html="funGameNote" />
  </div>
</template>

<script>
import funGameNote from 'universal/html-snippets/fun-game-note'

export default {
  name: 'init-player-info_secret-word',
  computed: {
    funGameNote() {
      return funGameNote
    }
  },
}
</script>

<style lang="scss">
.init-player-info_secret-word {
  h3 {
    @include res-aware-element-spacing('margin-bottom', 'md');
  }
  h5:first-child {
    margin-top: 0;
  }
  p {
    @include res-aware-element-spacing('margin-top', 'xs');
  }
}
</style>

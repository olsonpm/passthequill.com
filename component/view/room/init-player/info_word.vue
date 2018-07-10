<template>
  <div class="init-player-info_word info">
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
import funGameNote from 'universal/fun-game-note'

export default {
  name: 'init-player-info_word',
  computed: {
    funGameNote() { return funGameNote }
  },
}
</script>

<style lang="scss">
.init-player-info_word {
  h3 {
    @include res-aware-element-spacing('margin-bottom', 'md');
  }
  h5:first-child {
    margin-top: 0;
  }
  p {
    @include res-aware-element-spacing('margin-top', 'xs');
  }

  .page-view {
    overflow: hidden;
    white-space: nowrap;

    > li {
      display: inline-block;
      vertical-align: top;
      white-space: normal;
      width: 100%;
    }
  }

  > .page-control {
    @include res-aware-element-spacing('margin-top', 'md');

    align-items: center;
    display: flex;
    height: 40px;
    justify-content: space-between;

    button.arrow-circle {
      display: flex;
    }

    button.arrow-circle,
    .page-marker {
      display: inline-block;
    }
  }
}
</style>

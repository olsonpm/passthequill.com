<template>
  <div class="more-info_unsubscribe-room-created info">
    <h3>Room Created Email</h3>
    <p>
      The email sent to the creator of the room after the room is&nbsp;created.
    </p>
    <h4>Its purpose</h4>
    <ul class="bulleted">
      <li>Sends the initial link to the game</li>
      <li>
        Confirms you own the address so future emails (e.g. 'Your Turn') will
        reach&nbsp;you
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'more-info_unsubscribe-room-created',
}
</script>

<style lang="scss">
.more-info_unsubscribe-room-created {
  h4 {
    margin-bottom: 0;
  }
  ul {
    @include res-aware-element-spacing('margin-top', 'xs');
  }
}
</style>

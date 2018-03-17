<template>
  <div class="more-info_unsubscribe-invitation info">
    <h3>Invitation Email</h3>
    <p>
      The email sent to the friend upon a room being created.
    </p>
    <h4>Its purpose</h4>
    <ul class="bulleted">
      <li>Sends the initial link to the game</li>
      <li>
        Confirms your friend owns the address so future emails
        (e.g. 'Your Turn') will reach&nbsp;them
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'more-info_unsubscribe-invitation',
}
</script>

<style lang="scss">
.more-info_unsubscribe-invitation {
  h4 {
    margin-bottom: 0;
  }
  ul {
    @include res-aware-element-spacing('margin-top', 'xs');
  }
}
</style>

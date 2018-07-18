<template>
  <div class="view error">
    <h2>An Error Occurred</h2>
    <p>
      You seeing this page means I screwed up and I'm sorry!  Error pages aren't
      as fun as playing a game <frown />
    </p>

    <help-with-unexpected-error />

    <p class="closing-statement">
      Thanks for your understanding and&nbsp;patience,
    </p>
    <span class="signature">Phil</span>
  </div>
</template>

<script>
export default {
  name: 'error',
}
</script>

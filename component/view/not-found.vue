<template>
  <div>
    <h2>Page Not Found</h2>
    <p>
      Normally you'll reach this page by clicking an old link somewhere online.
      This is fine because links eventually go out of date.  However it's
      possible I screwed up and you've reached this page when you shouldn't
      have.  If you feel this is the case then email me at
      {{ global.authorEmail }} with the url and an explanation of how you got
      here. An issue like this shouldn't take long to&nbsp;fix.
    </p>

    <p class="closing-statement">
      I hope you've been enjoying the&nbsp;game,
    </p>
    <span class="signature">Phil</span>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  path: '*',
  beforeRouteLeave(_unused_to, _unused_from, next) {
    this.$store.commit('setShowNotFoundView', false)
    next()
  },
}
</script>

<template>
  <form class="my-form"
    :class="{ submitted: state.submitted }"
    @submit.prevent.stop="submit"
    @keydown.enter="setSubmitActive(true)"
    @keyup.enter="setSubmitActive(false)"
    novalidate>

    <slot />
  </form>
</template>

<script>
export default {
  name: 'my-form',
  props: ['form-object', 'on-submit', 'set-submit-active'],
  data: () => ({
    state: { submitted: false },
  }),
  methods: {
    submit() {
      this.state.submitted = true
      this.formObject.__setSubmitted(true)
      this.onSubmit()
    },
  },
}
</script>

<style lang="scss">
.my-form {
  .loading-check {
    @include res-aware-element-spacing('margin-left', 'md');

    height: 48px;
    width: 48px;
  }

  .submit {
    vertical-align: top;

    + .failure-link {
      @include res-aware-element-spacing('margin-top', $button-margin-top-size);
      @include res-aware-element-spacing(
        ('padding-top', 'padding-bottom'),
        $button-vertical-padding-size
      );
      @include res-aware-element-spacing(
        ('padding-left', 'padding-right'),
        'sm'
      );
    }
  }
}
</style>

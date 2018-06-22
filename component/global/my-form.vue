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
    state: {
      isSubmitting: false,
      submitted: false,
    },
  }),
  methods: {
    submit() {
      const { formObject, state } = this

      if (state.isSubmitting) return
      else state.isSubmitting = true

      state.submitted = true
      formObject.__setSubmitted(true)

      return Promise.resolve()
        .then(() => this.onSubmit())
        // finally
        .then(() => {
          state.isSubmitting = false
        })
        .catch(() => {
          state.isSubmitting = false
        })
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

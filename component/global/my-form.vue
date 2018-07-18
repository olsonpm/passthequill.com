<template>
  <form class="my-form"
    :class="{ submitted: state.submitted }"
    @submit.prevent.stop="submitWrapper"
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
    submitWrapper() {
      const { formObject, state } = this

      if (state.isSubmitting) return
      else state.isSubmitting = true

      state.submitted = true
      formObject.__setSubmitted(true)

      return (
        Promise.resolve()
          .then(() => this.onSubmit())
          .finally(() => {
            state.isSubmitting = false
          })
      )
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
  }

  .failure-link {
    // we don't want a border, but we need one to make sure the sizing is the
    //   same as the sibling button.submit
    border: 1px solid transparent;

    @include for-tablets-and-up {
      @include res-aware-element-spacing('margin-top', $button-margin-top-size);

      display: inline-block;

      //
      // this is necessary for the padding to align properly (height happens
      //   to be the height of the sibling <p> element)
      //
      > .wrapper {
        height: 18px;
        line-height: 18px;
        margin-top: -8px;
      }
    }

    @include for-phones-and-down {
      @include res-aware-element-spacing('margin-top', 'lg');
      @include res-aware-element-spacing('padding', 'sm');

      display: flex;
    }

    @include for-tablets {
      padding: $button-vertical-padding-tablets-and-smaller
        $button-horizontal-padding-tablets-and-smaller;
    }

    @include for-desktops {
      padding: $button-vertical-padding-desktops
        $button-horizontal-padding-desktops;
    }
  }
}
</style>

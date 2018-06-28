<template>
  <div class="my-text-input"
    :class="{ readonly }">

    <simple-button v-if="infoComponentName"
      class="help"
      :on-click="displayInfo">

      <help-circle />
    </simple-button>

    <label :for="id">{{ label }}</label>
    <div class="input-wrapper"
      ref="inputWrapper">

      <input :class="{ invalid: isInvalid }"
        :disabled="readonly"
        :id="id"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        ref="input"
        v-model="parentComponent.formData.inputs[camelId]"
      />
    </div>
    <my-text-submit-button v-if="includeInlineSubmitButton" />
  </div>
</template>

<script>
import camelCase from 'camelcase'
import Vue from 'vue'

import { containedIn, isLaden } from 'fes'
import { log, noop } from 'universal/utils'
import { onBlur } from 'client/utils'

const isValidType = containedIn(['email'])

export default {
  name: 'my-text-input',
  //
  // This goofy 'mounted' code is to get around an issue (at least in firefox)
  //   where the :focus-within styles weren't being applied on initial page
  //   load.  Also single page apps aren't "autofocus" friendly when switching
  //   views as the browser only applies autofocus upon entire page loads.
  //   That's why it must be manually applied in 'mounted'
  //
  mounted() {
    this.$nextTick(() => {
      this.disposeOnBlur = noop

      if (this.autofocus) {
        const { input, inputWrapper } = this.$refs
        inputWrapper.setAttribute('focus-within', '')
        input.focus()
        const disposeOnBlur = onBlur(input, () => {
          inputWrapper.removeAttribute('focus-within')
          // we only needed it the first time
          disposeOnBlur()
        })
      }
    })
  },
  //
  // the parentComponent is necessary to dynamically access computed properties
  //
  props: {
    autofocus: {
      type: Boolean,
    },
    disableValidationIndicator: {
      type: Boolean,
    },
    id: {
      type: String,
      required: true,
      validator: isLaden,
    },
    includeInlineSubmitButton: {
      default: false,
    },
    infoComponentName: {
      type: String,
    },
    label: {
      type: String,
      required: true,
      validator: isLaden,
    },
    maxlength: {},
    //
    // I want this to be explicit because accessing the parent is bad practice
    //
    parentComponent: {
      type: Vue,
      required: true,
    },
    placeholder: {
      type: String,
    },
    readonly: {
      type: Boolean,
    },
    type: {
      type: String,
      validator: value => {
        if (value === 'text' && process.env.NODE_ENV !== 'production') {
          log('text is the default input type - no need to pass it explicitly')
        }
        return isValidType(value)
      },
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    camelId() {
      return camelCase(this.id)
    },
    isInvalid() {
      const { camelId, parentComponent } = this

      return (
        this.showValidationIndicator && !parentComponent[`${camelId}_isValid`]
      )
    },
    showValidationIndicator() {
      return !this.disableValidationIndicator
    },
  },
  methods: {
    displayInfo() {
      this.$myStore.dispatch('lightbox/tryToShow', {
        componentName: this.infoComponentName,
      })
    },
  },
}
</script>

<style lang="scss">
.my-text-input {
  button.help {
    @include res-aware-element-spacing('margin-right', 'sm');
    vertical-align: middle;

    // this offsets the perceived vertical alignment caused by the shadow
    margin-top: -4px;

    .help-circle {
      color: $bg;
      fill: $quill-blue;
    }
  }

  > label {
    cursor: pointer;
  }

  &.readonly {
    > label {
      cursor: text;
    }

    > .input-wrapper {
      border-color: transparent;

      > input:not([type]),
      > input[type='text'],
      > input[type='email'] {
        &:disabled {
          background-color: transparent;
          color: currentColor;
          cursor: text;
        }
      }
    }
  }

  > .input-wrapper {
    @include for-tablets-and-up {
      display: inline-block;
      width: $default-textbox-width + 2;
    }

    border: 1px solid $fg-light;
    border-radius: $radius-small;
    box-shadow: 0 0 0 transparent;
    transition-duration: $duration-tiny;
    transition-property: box-shadow, border-color;
    transition-timing-function: $easing-default;

    &:focus-within {
      border-color: $orange;
      box-shadow: 0 0 10px $orange;

      > input {
        outline: none;
      }
    }

    > input:not([type]),
    > input[type='text'],
    > input[type='email'] {
      @include res-aware-element-spacing(
        ('padding-left', 'padding-right'),
        'sm'
      );
      @include res-aware-element-spacing(
        ('padding-top', 'padding-bottom'),
        'xs'
      );

      border-bottom: none;
      border-left: none;
      border-right: 0 solid transparent;
      border-top: none;
      display: block;
      transition-duration: $duration-short;
      transition-property: border-right-color, border-right-width;
      transition-timing-function: $easing-default;

      //
      // the hardcoded "- 1" is to cover a visual affect I don't understand.  If
      //   the border radius of the input element matches its wrapper then there
      //   exists visible whitespace between the two borders at the radius.
      //
      border-radius: $radius-small - 1;

      //
      // This shouldn't be necessary because `display: block` should stretch the
      //   element to the width of the container.  But browsers be browsers, and
      //   input elements need to explicitly set width: 100%
      //
      // see https://stackoverflow.com/questions/1030793/input-with-displayblock-is-not-a-block-why-not
      //   for more info
      //
      width: 100%;
    }
  }
}

form.submitted .input-wrapper {
  > input:not([type]),
  > input[type='text'],
  > input[type='email'] {
    &.invalid {
      @include per-screen-size('border-right-width', 3, 4, 5, 5, px);
      border-right-color: $error-red;
    }
  }
}
</style>

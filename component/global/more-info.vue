<template>
  <div class="more-info"
    :class="{ expanded: state.expanded }"
    ref="moreInfoEl"
    @keyup.space="showOrHide"
    @keyup.enter="showOrHide"
    tabindex="0">

    <simple-button tabindex="-1"
      class="summary"
      has-custom-styled-focus
      :on-click="showOrHide">

      <help-circle />
      <p>
        <slot name="summary" />
      </p>
      <chevron-down ref="chevronDownComponent" />
    </simple-button>

    <div class="details" ref="detailsEl">
      <slot name="details" />
    </div>
  </div>
</template>

<script>
import { animate } from 'client/utils'

export default {
  name: 'more-info',
  data: () => ({
    state: {
      expanded: false,
      animating: false,
    },
  }),
  methods: {
    showOrHide() {
      const { state } = this

      if (state.animating) return
      else state.animating = true

      const { chevronDownComponent, detailsEl, moreInfoEl } = this.$refs
      const chevronDownEl = chevronDownComponent.$el

      if (state.expanded) {
        const scrollY = document.documentElement.scrollTop

        const oldHeight = moreInfoEl.offsetHeight + 'px'
        detailsEl.style.display = 'none'
        const newHeight = moreInfoEl.offsetHeight + 'px'
        detailsEl.style.display = 'block'

        animate(chevronDownEl, {
          transform: ['rotate(0deg)', 'rotate(180deg)'],
        })

        animate(
          moreInfoEl,
          { height: [newHeight, oldHeight] },
          {
            begin: () => {
              window.scrollTo(0, scrollY)
            },
          }
        ).then(() => {
          detailsEl.style.display = null
          moreInfoEl.style.height = null
          state.animating = false
          state.expanded = false
        })
      } else {
        // not expanded
        const oldHeight = moreInfoEl.offsetHeight + 'px'
        detailsEl.style.display = 'block'
        const newHeight = moreInfoEl.offsetHeight + 'px'

        state.expanded = true

        animate(chevronDownEl, {
          transform: ['rotate(180deg)', 'rotate(0deg)'],
        })

        animate(moreInfoEl, { height: [newHeight, oldHeight] }).then(() => {
          moreInfoEl.style.height = null
          state.animating = false
        })
      }
    },
  },
}
</script>

<style lang="scss">
.more-info {
  @include res-aware-element-spacing('margin-top', 'md');
  @include shadow-normal;

  border: 1px solid $quill-blue;
  border-radius: $radius-small;
  overflow: hidden;
  transition-property: border-color;
  transition-duration: 0.15s;
  transition-timing-function: $easing-default;

  &:focus {
    border-color: $orange;
    box-shadow: 0 0 10px $orange;
    outline: 0;
  }

  &.expanded .summary {
    border-bottom: 1px solid $shadow-gray-default;
  }

  .details {
    @include res-aware-element-spacing('padding', 'sm');

    display: none;

    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }

  .summary {
    @include res-aware-element-spacing('padding', 'sm');

    cursor: pointer;
    display: block;
    position: relative;
    text-align: left;

    //
    // again, I'm not sure why  this is necessary.  'block' just doesn't seem to
    //   work as I think it should on form elements.
    //
    width: 100%;

    > .help-circle {
      filter: none;
    }

    > * {
      display: inline-block;
      vertical-align: middle;
    }

    > p {
      @include res-aware-element-spacing(('margin-left', 'margin-right'), 'sm');
      margin: 0;
    }

    .chevron-down {
      @include res-aware-element-spacing('margin-right', 'sm');

      color: $quill-blue;
      position: absolute;
      right: 0;
    }
  }
}
</style>

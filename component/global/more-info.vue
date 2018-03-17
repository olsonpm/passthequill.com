<template>
  <div class="more-info"
    ref="moreInfoEl"
    @keyup.space="showOrHide"
    @keyup.enter="showOrHide"
    tabindex="0">

    <div class="summary" @click="showOrHide">
      <help-circle with-border />
      <p>
        <slot name="summary" />
      </p>
      <chevron-down ref="chevronDownComponent" />
    </div>

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

        animate(chevronDownEl, {
          transform: ['rotate(180deg)', 'rotate(0deg)'],
        })

        animate(moreInfoEl, { height: [newHeight, oldHeight] }).then(() => {
          moreInfoEl.style.height = null
          state.animating = false
          state.expanded = true
        })
      }
    },
  },
}
</script>

<style lang="scss">
.more-info {
  @include res-aware-element-spacing('margin-top', 'md');
  @include shadow-normal($with-focus: true);

  background-color: $info-blue;
  border: 1px solid $info-blue;
  border-radius: $radius-small;
  overflow: hidden;
  transition-property: border-color;
  transition-duration: 0.15s;
  transition-timing-function: $easing-default;

  &:focus {
    border-color: $info-blue-focus;
    outline: 0;
  }

  .details {
    @include res-aware-element-spacing('padding', 'sm');

    background-color: $info-blue-light;
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
    @include shadow-small;

    cursor: pointer;
    position: relative;

    > .help-circle {
      color: $info-blue-focus;
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

      position: absolute;
      right: 0;
    }
  }

  a.custom-focus:focus {
    &::before {
      background-color: white;
      box-shadow: 0 0 5px darken($shadow-gray-default, 40%);
    }
  }
}
</style>

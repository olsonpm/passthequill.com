<template>
  <spacing-wrapper type="previous sibling height">
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      class="loading-check"
      :class="{
        success,
        loading: state.loading,
      }">

      <circle cx="12" cy="12" r="12" />
      <path d="M7,12L11,16L19,8" />
    </svg>
  </spacing-wrapper>
</template>

<script>
import { waitMs } from 'universal/utils'

//
// TODO: use eventManager instead of the watchers and local state
//
export default {
  name: 'loading-check',
  data() {
    return {
      state: {
        loading: this.loading
      }
    }
  },
  watch: {
    loading(value) {
      if (value) this.state.loading = true
    },
    success(value) {
      if (value) {
        waitMs(400).then(() => {
          this.state.loading = false
        })
      }
    }
  },
  props: ['loading', 'success'],
}
</script>

<style lang="scss">
$curve: cubic-bezier(0.65, 0, 0.45, 1);

.loading-check {
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;

  &.success {
    animation: fill 0.4s $curve 0.4s forwards;

    > path {
      display: inline-block;
    }
  }

  &.loading {
    > circle {
      animation: stroke 1s linear forwards;
      animation-iteration-count: infinite;
      stroke: $green;
      stroke-dasharray: 25, 51;
      stroke-dashoffset: 76;
      stroke-width: 2;
    }
  }

  > circle {
    fill: none;
  }

  > path {
    animation: stroke 0.3s $curve 0.8s forwards;
    display: none;
    stroke: $bg;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    stroke-width: 1.2;
    transform-origin: 50% 50%;
  }
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes fill {
  0% {
    box-shadow: inset 0px 0px 0px 0px $green;
  }
  100% {
    box-shadow: inset 0px 0px 0px 30px $green;
  }
}
</style>

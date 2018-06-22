<template>
  <div class="init-player-info_word info">
    <h3>Secret Word</h3>

    <ul ref="pageViewEl"
      class="page-view">

      <li>
        <h5>In short</h5>
        <p>
          Give a 5 letter word for your friend to&nbsp;guess.
        </p>

        <h5>In depth</h5>
        <p>
          To be clear, the only hard constraint here is that you type five
          unique letters. The word is not case sensitive and there is no check
          against a dictionary to&nbsp;validate.
        </p>
      </li>
      <li>
        <p>
          <span class="important">For a fun game however</span>, you should pick
          a word both you and your friend are familiar with.  This game is about
          deducing your friend's word, so if you have no idea a word exists then
          you just end up guessing in the end which isn't very&nbsp;enjoyable.
        </p>
      </li>
      <li>
        <p>
          Finally, make sure you and your friend are on the same page with what
          words are okay.  A lot of people for instance don't allow proper
          nouns, or maybe you only want to allow words from a certain
          "words with friends" dictionary.  Being on the same page will make the
          game more&nbsp;fun.
        </p>
      </li>
    </ul>

    <div class="page-control">
      <arrow-circle ref="leftArrowComponent"
        direction="left"
        data-animate="{ duration: { opacity: 'fast' } }"
        :show-initially="false"
        :onClick="slideLeft" />

      <page-marker :active-page="state.activePage"
        :number-of-pages="numberOfPages"
        :slide-to="slideTo" />

      <arrow-circle ref="rightArrowComponent"
        direction="right"
        data-animate="{ duration: { opacity: 'fast' } }"
        :show-initially="true"
        :onClick="slideRight" />
    </div>
  </div>
</template>

<script>
//---------//
// Imports //
//---------//

import hammerjs from 'hammerjs'

import { bindAll } from 'universal/utils'
import { animate, animateShow, animateHide } from 'client/utils'

//
//------//
// Main //
//------//

export default {
  name: 'init-player-info_word',
  data: () => ({
    state: {
      activePage: 1,
      isSliding: false,
      previousPage: null,
    }
  }),
  mounted() {
    this.createTouchManager()
  },
  computed: {
    numberOfPages() {
      return 3
    },
    showLeftArrow() {
      return this.state.activePage > 1
    },
    showRightArrow() {
      const { numberOfPages, state } = this
      return state.activePage < numberOfPages
    },
    wasShowingLeftArrow() {
      return this.state.previousPage > 1
    },
    wasShowingRightArrow() {
      const { numberOfPages, state } = this
      return state.previousPage < numberOfPages
    },
  },
  methods: {
    createTouchManager() {
      const { DIRECTION_HORIZONTAL: direction } = hammerjs,
        { Swipe, Manager } = bindAll(['Swipe', 'Manager'], hammerjs)

      this.touchManager = new Manager(this.$el, {
        recognizers: [[Swipe, { direction }]],
      })

      this.touchManager.on('swipeleft swiperight', this.onSwipe.bind(this))
    },
    //
    // TODO: figure out if there's a simpler yet still readable approach to
    //   this problem
    //
    maybeFadePageArrows() {
      const {
        $refs,
        showLeftArrow,
        showRightArrow,
        wasShowingLeftArrow,
        wasShowingRightArrow,
      } = this

      const { leftArrowComponent, rightArrowComponent } = $refs

      const animations = []

      if (wasShowingLeftArrow && !showLeftArrow)
        animations.push(animateHide(leftArrowComponent))

      if (wasShowingRightArrow && !showRightArrow)
        animations.push(animateHide(rightArrowComponent))

      if (!wasShowingLeftArrow && showLeftArrow)
        animations.push(animateShow(leftArrowComponent))

      if (!wasShowingRightArrow && showRightArrow)
        animations.push(animateShow(rightArrowComponent))

      return animations
    },
    onSwipe({ type }) {
      const { numberOfPages, state } = this
      if (type === 'swipeleft' && state.activePage < numberOfPages) {
        this.slide(1)
      } else if (type === 'swiperight' && state.activePage > 1) {
        this.slide(-1)
      }
    },
    slideLeft() {
      return this.slide(-1)
    },
    slideRight() {
      return this.slide(1)
    },
    slide(positionMoved) {
      const { $refs, state } = this

      if (state.isSliding) return
      else state.isSliding = true

      const pageViewEl = $refs.pageViewEl,
        index = state.activePage - 1,
        to = (index + positionMoved) * 100,
        from = index * 100,
        fromNode = pageViewEl.childNodes[index],
        toNode = pageViewEl.childNodes[index + positionMoved],
        transform = [`translateX(-${to}%)`, `translateX(-${from}%)`]

      state.previousPage = state.activePage
      state.activePage += positionMoved

      return Promise.all([
        animate(fromNode, { opacity: [0, 1], transform }),
        animate(toNode, { opacity: [1, 0], transform }),
        ...this.maybeFadePageArrows(),
      ]).then(() => {
        state.isSliding = false
      })
    },
    slideTo(pageNumber) {
      return this.slide(pageNumber - this.state.activePage)
    }
  }
}
</script>

<style lang="scss">
.init-player-info_word {
  h3 {
    @include res-aware-element-spacing('margin-bottom', 'md');
  }
  h5:first-child {
    margin-top: 0;
  }
  p {
    @include res-aware-element-spacing('margin-top', 'xs');
  }

  .page-view {
    overflow: hidden;
    white-space: nowrap;

    > li {
      display: inline-block;
      vertical-align: top;
      white-space: normal;
      width: 100%;
    }
  }

  > .page-control {
    @include res-aware-element-spacing('margin-top', 'md');

    align-items: center;
    display: flex;
    height: 40px;
    justify-content: space-between;

    button.arrow-circle {
      display: flex;
    }

    button.arrow-circle,
    .page-marker {
      display: inline-block;
    }
  }
}
</style>

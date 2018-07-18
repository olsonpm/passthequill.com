<template>
  <div class="lightbox" :class="{ active: state.isActive }">
    <div class="backlight"
      ref="backlightEl"
      @click="tryToHide" />

    <div class="modal" ref="modalEl">
      <simple-button class="close"
        :on-click="tryToHide">

        <close-x />
      </simple-button>

      <component v-if="componentName"
        class="content"
        :is="componentName" />
    </div>
  </div>
</template>

<script>
import defaultLightbox from './default-lightbox'
import infoUnsubscribeAll from '../view/email/unsubscriptions/info_all'
import infoUnsubscribeRoomCreated from '../view/email/unsubscriptions/info_room-created'
import infoUnsubscribeInvitation from '../view/email/unsubscriptions/info_invitation'
import initPlayerInfo_displayName from '../view/room/init-player/info_display-name'
import initPlayerInfo_secretWord from '../view/room/init-player/info_secret-word'
import warnUnsubscribeRoomCreated from '../view/email/unsubscriptions/warn_room-created'

import { createNamespacedHelpers } from 'vuex'
import { animateAll, getSiblingElements } from 'client/utils'
import { onKeyUp } from 'client/utils'
import { map } from 'fes'

const { mapState: mapLightboxState } = createNamespacedHelpers('lightbox'),
  possibleLightboxComponents = getPossibleLightboxComponents()

export default {
  name: 'lightbox',
  computed: mapLightboxState(['componentName', 'isAnimating', 'show']),
  beforeMount() {
    this.disposeKeyUp = onKeyUp('Escape', this.tryToHide)
  },
  beforeDestroy() {
    this.disposeKeyUp()
  },
  components: possibleLightboxComponents,
  data: () => ({
    state: {
      isActive: false,
    },
  }),
  methods: {
    tryToHide() {
      this.$myStore.dispatch('lightbox/tryToHide')
    },
    animateHide() {
      const { $refs, $el, $store, state } = this,
        { backlightEl, modalEl } = $refs,
        siblings = getSiblingElements($el),
        deblur = { filter: ['blur(0px)', 'blur(3px)'] },
        deblurSiblings = map(siblingEl => [siblingEl, deblur])(siblings)

      animateAll([
        [backlightEl, { opacity: [0, 0.6] }],
        [
          modalEl,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
        ],
        ...deblurSiblings,
      ]).then(() => {
        modalEl.style.top = null
        state.isActive = false
        $store.commit('lightbox/setIsAnimating', false)
        $store.commit('lightbox/setComponentName', null)
      })
    },
    animateShow() {
      const { $refs, $el, $store, state } = this,
        { backlightEl, modalEl } = $refs,
        siblings = getSiblingElements($el),
        deblur = { filter: ['blur(3px)', 'blur(0px)'] },
        blurSiblings = map(siblingEl => [siblingEl, deblur])(siblings)

      state.isActive = true
      modalEl.style.top = (Math.round(window.scrollY) + 20) + 'px'

      animateAll([
        //
        // the hardcoded duration here was eyed via guess & check.  I don't
        //   understand why if the durations are the same it looked out of sync,
        //   but I assume it has something to do with the opacity going to 0.8
        //   whereas the modal's opacity animates to 1.  The really odd part
        //   though is the same visual effect (perceived by me) doesn't apply to
        //   hiding, only showing the lightbox.
        //
        [backlightEl, { opacity: [0.6, 0] }, { duration: 120 }],
        [
          modalEl,
          {
            opacity: [1, 0],
            transform: ['translateY(0px)', 'translateY(-20px)'],
          },
        ],
        ...blurSiblings,
      ]).then(() => {
        $store.commit('lightbox/setIsAnimating', false)
      })
    },
  },
  watch: {
    show(value) {
      const method = value ? 'animateShow' : 'animateHide'
      this[method]()
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getPossibleLightboxComponents() {
  return [
    defaultLightbox,
    infoUnsubscribeAll,
    infoUnsubscribeRoomCreated,
    infoUnsubscribeInvitation,
    initPlayerInfo_displayName,
    initPlayerInfo_secretWord,
    warnUnsubscribeRoomCreated,
  ].reduce((nameToComponent, component) => {
    nameToComponent[component.name] = component
    return nameToComponent
  }, {})
}
</script>

<style lang="scss">
.lightbox {
  display: none;
  position: relative;

  &.active {
    display: block;
  }

  > .backlight {
    background-color: white;
    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  > .modal {
    @include shadow-normal;
    @include res-aware-element-spacing(
      ('padding-top', 'padding-bottom', 'padding-left'),
      'md'
    );

    @include for-phones-and-up {
      padding-right: 65px;
    }
    @include for-small-phones {
      padding-right: 40px;
    }

    background-color: $bg;
    border: 1px solid $bg-off;
    border-radius: $radius-large;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: round($site-width / 2);
    opacity: 0;
    position: absolute;
    right: 0;
    z-index: 4;

    .close {
      @include res-aware-element-spacing(('top', 'right'), 'sm');

      position: absolute;
    }

    .content {
      @include per-screen-size('padding-left', 18, 21, 24, 24, 'px');
      @include res-aware-element-spacing(
        ('padding-top', 'padding-bottom'),
        'sm'
      );

      border-left-width: 3px;
      border-left-style: solid;

      &.error {
        border-left-color: $error-red;
      }
      &.warn {
        border-left-color: $yellow-warn;
      }
      &.info {
        border-left-color: $quill-blue;
      }

      > :first-child {
        margin-top: 0;
      }
      > :last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

//
// README
//   - For performance reasons, this ssr app sets createBundleRenderer's
//     `runInNewContext` to false.  Because Vue is a stateful singleton (e.g.
//     plugins are applied globally) this causes issues with plugins that hold
//     state. Clean root constructors will hopefully be available in vue 2.6 per
//     https://github.com/vuejs/vue/issues/7771, but until then this plugin
//     uses some less-than-ideal code to get around the limitation.
//

//---------//
// Imports //
//---------//

import { forEach, invoke } from 'fes'
import subscribeToAll from './subscribe-to-all'

//
//------//
// Init //
//------//

//
// unsubscribeCallbacks is a two-dimensional map where the first key is a root
//   vue component.  The second key is a component instance which points to an
//   array of unsubscribe callbacks.
//
const unsubscribeCallbacks = new WeakMap()

const rootVueComponentToEventManager = new WeakMap()

//
//------//
// Main //
//------//

const install = vue => {
  vue.mixin({
    beforeCreate() {
      const { $root, $options } = this,
        { eventManager, parent } = $options

      if (this === $root && eventManager) {
        unsubscribeCallbacks.set(this, new Map())
        rootVueComponentToEventManager.set(this, eventManager)
        this.$eventManager = eventManager
      } else if (parent && parent.$eventManager) {
        this.$eventManager = parent.$eventManager
      }
    },

    beforeDestroy() {
      const { $root } = this

      if (this === $root) {
        unsubscribeCallbacks.delete($root)
        return
      }

      const componentToUnsubscribeCallbacks = unsubscribeCallbacks.get($root)
      if (!componentToUnsubscribeCallbacks) return

      const callbacks = componentToUnsubscribeCallbacks.get(this)
      if (!callbacks) return

      forEach(invoke)(callbacks)
    },

    created() {
      const { $root } = this

      if (this === $root) return

      const eventManager = rootVueComponentToEventManager.get($root)
      if (!eventManager) return
      else if (!this.$options.subscribeTo) return

      const callbacks = subscribeToAll(this, eventManager)

      const componentToUnsubscribeCallbacks = unsubscribeCallbacks.get($root)

      componentToUnsubscribeCallbacks.set(this, callbacks)
    },
  })
}

//
//---------//
// Exports //
//---------//

export default install

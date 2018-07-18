//
// README
//   - This just installs a wrapper around store which injects properties that
//     should be globally available in each action.  Right now it's hardcoded
//     to only inject eventManager.  Should I need more in the future then I'll
//     rewrite it to be a declarative option inside the vue app constructor.
//

//---------//
// Imports //
//---------//

import tedent from 'tedent'
import { truncate } from 'universal/utils'
import { assignOver } from 'fes'

//
//------//
// Main //
//------//

const install = vue => {
  vue.mixin({
    beforeCreate() {
      const { $root, $options = {} } = this,
        { eventManager, parent, store } = $options

      if (this === $root && eventManager && store) {
        this.$myStore = createMyStore(eventManager, store)
      } else if (parent && parent.$myStore) {
        this.$myStore = parent.$myStore
      }
    },
  })
}

//
//------------------//
// Helper Functions //
//------------------//

function createMyStore(eventManager, store) {
  return {
    dispatch: (...args) => {
      if (typeof args[0] === 'string') {
        // eslint-disable-next-line prefer-const
        let [type, payload = {}, options] = args

        if (typeof payload !== 'object' || payload === null) {
          throw new Error(
            tedent(`
              All dispatches should have object payloads
              typeof payload: ${typeof payload}
              payload: ${truncate(payload)}
            `)
          )
        }
        payload = assignOver({ eventManager })(payload)
        return store.dispatch(type, payload, options)
      } else {
        // eslint-disable-next-line prefer-const
        let [action, options] = args
        action = assignOver({ eventManager })(action)
        return store.dispatch(action, options)
      }
    },
  }
}

//
//---------//
// Exports //
//---------//

export default install

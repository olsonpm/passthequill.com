//------//
// Main //
//------//

const initPlayer = {
  state: getInitialState,
  mutations: {
    setPlaceholder(state, placeholder) {
      state.placeholder = placeholder
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getInitialState() {
  return {
    placeholder: {
      displayName: '',
      secretWord: '',
    },
  }
}

//
//---------//
// Exports //
//---------//

export default initPlayer

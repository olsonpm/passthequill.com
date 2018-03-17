//------//
// Main //
//------//

const unexpectedError = {
  state: getInitialState,
  mutations: {
    setFriendlyMessage(state, friendlyMessage) {
      state.friendlyMessage = friendlyMessage
    },
  },
}

//
//------------------//
// Helper Functions //
//------------------//

function getInitialState() {
  return {
    friendlyMessage: '',
  }
}

//
//---------//
// Exports //
//---------//

export default unexpectedError

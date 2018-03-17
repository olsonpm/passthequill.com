//---------//
// Imports //
//---------//

import { websocketUrl } from 'project-root/config/debug'

//
//------//
// Main //
//------//

const init = () => {
  const debugWebsocket = new WebSocket(websocketUrl.debug)

  debugWebsocket.onmessage = event => {
    if (event.data === 'reload page') {
      debugWebsocket.close()
      window.location.reload(true)
    }
  }
}

//
//---------//
// Exports //
//---------//

export default init

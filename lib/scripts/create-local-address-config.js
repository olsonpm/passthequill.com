//
// TODO: figure out a sensible way to configure the frontend such that it
//   doesn't require server-specific code.
//

import dnsSync from 'dns-sync'
import os from 'os'

// eslint-disable-next-line no-console
console.log(`export default '${dnsSync.lookup(os.hostname())}'`)

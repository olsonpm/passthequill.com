//---------//
// Imports //
//---------//

import { omitWhen, pickAll, startsWith } from 'fes'

//
//------//
// Main //
//------//

const pickIdAndRev = pickAll(['_id', '_rev'])

const removeCouchdbProperties = omitWhen(startsWith('_'))

//
//---------//
// Exports //
//---------//

export { pickIdAndRev, removeCouchdbProperties }

//---------//
// Imports //
//---------//

import { approveIsLaden } from 'universal/utils'
import { assignOver } from 'fes'

//
//------//
// Main //
//------//

const normalizeField = aField => {
  aField = typeof aField === 'string' ? { name: aField } : aField

  return assignOver({
    approve: approveIsLaden,
    isRequired: true,
  })(aField)
}

//
//---------//
// Exports //
//---------//

export default normalizeField

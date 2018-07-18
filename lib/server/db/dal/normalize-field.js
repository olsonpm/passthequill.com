//---------//
// Imports //
//---------//

import { approveIsLaden } from 'universal/utils'
import { assignOver } from 'fes'

//
//------//
// Main //
//------//

const normalizeField = (aField, key) => {
  aField = typeof aField === 'string' ? { name: aField } : aField

  return assignOver({
    approve: approveIsLaden,
    name: key,
    isRequired: true,
  })(aField)
}

//
//---------//
// Exports //
//---------//

export default normalizeField

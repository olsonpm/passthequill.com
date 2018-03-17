//---------//
// Imports //
//---------//

import databaseNames from './dal/database-names'
import { map, passThrough } from 'fes'
import { couchdb } from 'server/api'

//
//------//
// Init //
//------//

const { createDb, deleteDb } = couchdb,
  pAll = arrayOfPromises => Promise.all(arrayOfPromises),
  deleteIfExists = name => deleteDb(name, { allow404: true })

//
//------//
// Main //
//------//

const createAllDatabases = () =>
    passThrough(databaseNames, [map(createDb), pAll]),
  deleteAllDatabases = () =>
    passThrough(databaseNames, [map(deleteIfExists), pAll])

//
//---------//
// Exports //
//---------//

export { createAllDatabases, deleteAllDatabases }

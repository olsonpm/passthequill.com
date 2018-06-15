//---------//
// Imports //
//---------//

import path from 'path'

import { map } from 'fes'

//
//------//
// Main //
//------//

const getModuleAliases = () => {
  return map(toAbsolute)({
    'project-root': '.',
    server: 'lib/server',
    client: 'lib/client',
    universal: 'lib/universal',
  })
}

const projectRootDirectory = path.resolve(__dirname, '../../')

//
//------------------//
// Helper Functions //
//------------------//

function toAbsolute(relativePath) {
  return path.resolve(projectRootDirectory, relativePath)
}

//
//---------//
// Exports //
//---------//

export { getModuleAliases, projectRootDirectory }

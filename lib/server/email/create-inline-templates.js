//
// README
//   - This will be ran on web-server initialization during development.  In
//     production it is assumed this will be versioned and will thus be run at
//     at the time of release.
//

//---------//
// Imports //
//---------//

import juice from 'juice'
import path from 'path'
import pretty from 'pretty'

import { contains, discardWhen, map, passThrough } from 'fes'
import { readdir, writeFile } from 'server/utils'
import { log, removeExtension } from 'universal/utils'

//
//------//
// Init //
//------//

const emailTemplatesDir = path.resolve(__dirname, 'templates')

//
//------//
// Main //
//------//

const createInlineTemplates = () => {
  return readdir(emailTemplatesDir)
    .then(filenames => {
      const writeFiles = passThrough(filenames, [
        discardWhen(contains('.inline.')),
        map(prepAndWriteFile),
      ])

      return Promise.all(writeFiles)
    })
    .then(() => log('inline templates created'))
}

//
//------------------//
// Helper Functions //
//------------------//

function prepAndWriteFile(filename) {
  return passThrough(filename, [
    juice,
    pretty,
    writeFile(toInlineTemplateFilename(filename)),
  ])
}

function toInlineTemplateFilename(fname) {
  fname = removeExtension(fname)
  return path.resolve(emailTemplatesDir, `${fname}.inline.html`)
}

//
//---------//
// Exports //
//---------//

export default createInlineTemplates

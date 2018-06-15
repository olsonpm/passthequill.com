//---------//
// Imports //
//---------//

import _fs from 'fs'
import juice from 'juice'
import path from 'path'
import pify from 'pify'
import pretty from 'pretty'

import { contains, discardWhen, map, passThrough } from 'fes'

//
//------//
// Init //
//------//

const emailTemplatesDir = path.resolve(__dirname, 'templates'),
  pFs = pify(_fs)

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
// Unfortunately `module-alias` was behaving oddly so I decided to rip it out.
//   They do mention the module is meant for development purposes so I was
//   naive for hoping it would work in prod.  Anyway, the below methods are
//   copy/paste in order to keep this module self-contained.  That way server
//   and universal utils can keep their aliases in-tact, where webpack will
//   handle them just fine
//

// from server/utils
function readdir(fpath) {
  return pFs.readdir(fpath)
}
function writeFile(fpath) {
  return content => pFs.writeFile(fpath, content)
}

// from universal/utils
function log(something) {
  console.log(something) // eslint-disable-line no-console
}
const removeExtension = filename => {
  const periodIndex = filename.lastIndexOf('.')
  return filename.slice(0, periodIndex)
}

//
//---------//
// Exports //
//---------//

export default createInlineTemplates

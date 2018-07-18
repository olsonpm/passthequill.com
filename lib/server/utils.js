//---------//
// Imports //
//---------//

import _fs from 'fs'
import Hashids from 'hashids'
import pify from 'pify'

import createApproveRequest from './create-approve-request'
import inputValidationInfo from '../universal/input-validation-info'
import log from './log'
import { noop } from '../universal/utils'
import { salt } from '../../config/app'

//
//------//
// Init //
//------//

const pFs = pify(_fs)

//
//------//
// Main //
//------//

const createHandleServerError = (createMessage, arrayOfArgs) => error => {
  const message = createMessage(...arrayOfArgs)

  error.message = message.detailed + '\n\n' + error.message
  return handleServerErrorSync(message.friendly, error)
}

const createIfRequestIsValid = endpointId => {
  const approveRequest = createApproveRequest(inputValidationInfo[endpointId])

  return runThisIfValid => ctx => {
    const errorMessage = approveRequest(ctx)
    if (errorMessage) {
      ctx.status = 400
      ctx.body = { error: errorMessage }
    } else {
      return runThisIfValid(ctx)
    }
  }
}

const handleServerErrorSync = (friendlyMessage, error) => {
  //
  // we want to let upstream know this has been logged/handled by the server.
  //   We also need to provide the friendly message so the web server code knows
  //   what to send to the client.
  //
  friendlyMessage = `An error occurred while ${friendlyMessage}`
  Object.assign(error, {
    isHandled: true,
    friendlyMessage,
  })
  log.server.error(error)
  return Promise.reject(error)
}

const hasher = new Hashids(salt.hashid)

const ifResponseIsNot404 = (ctx, runThisIfNot404) => response => {
  if (response.status === 404) {
    ctx.status = 404
    return { is404: true }
  }

  return runThisIfNot404(response.data)
}

// TODO: figure out a better way to manage 404s.  I'm hoping a better solution
//   reveals itself soon
const ifStatusIsNot404 = runThisIfNot404 => result => {
  return result.is404 ? undefined : runThisIfNot404(result)
}

const maybeReadFile = fpath => readFile(fpath).catch(noop)

const readdir = fpath => pFs.readdir(fpath)

const readFile = fpath => pFs.readFile(fpath, 'utf8')

const readRawFile = fpath => pFs.readFile(fpath)

const writeFile = fpath => content => pFs.writeFile(fpath, content)

//
//---------//
// Exports //
//---------//

export {
  createHandleServerError,
  createIfRequestIsValid,
  handleServerErrorSync,
  hasher,
  ifResponseIsNot404,
  ifStatusIsNot404,
  maybeReadFile,
  readdir,
  readFile,
  readRawFile,
  writeFile,
}

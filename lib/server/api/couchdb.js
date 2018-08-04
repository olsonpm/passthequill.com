//---------//
// Imports //
//---------//

import axios from 'axios'

import databaseNames from 'server/db/dal/database-names'

import { createCouchdbId } from 'server/db/couchdb-id-utils'
import { handleServerErrorSync } from 'server/utils'
import { resolveAll, then } from 'universal/utils'
import { baseUrl, couchdbAuth } from 'project-root/config/app'
import {
  getAxiosOptions,
  getResponseTransform,
  returnData,
} from 'universal/axios-helpers'
import {
  flow,
  getValueAt,
  isLaden,
  join,
  map,
  mapKeys,
  mMap,
  omit,
  omitAll,
  passThrough,
  prepend,
} from 'fes'

//
//------//
// Init //
//------//

const couchdb = axios.create({
  baseURL: baseUrl.couchdb,
  auth: couchdbAuth,
})

//
//------//
// Main //
//------//

const api = {
  createDb,
  createDbAccessor,
  createDbAndAccessor,
  deleteDb,
  getAllDocuments,
  getAllIds,
  replicateAllDbs,
  revertToFixture,
}

function createDbAccessor(name) {
  return {
    createDocument,
    deleteDocument,
    getDocument,
    getDocumentAtRevision,
    updateDocument,
  }

  // scoped helper functions

  function createDocument(data) {
    const error = approveId(data._id)
    if (error) handleServerErrorSync(`error creating a ${name} record`, error)

    return couchdb
      .put(`/${name}/${data._id}`, omit('_id')(data))
      .then(normalizeData)
      .then(returnData)
  }

  function deleteDocument({ _id, _rev }, options) {
    const error = approveIdAndRev(_id, _rev)
    if (error) handleServerErrorSync(`error deleting a ${name} record`, error)

    const maybeTransformResponse = getResponseTransform(options),
      axiosOptions = getAxiosOptions(options)

    return couchdb
      .delete(`/${name}/${_id}?rev=${_rev}`, axiosOptions)
      .then(maybeTransformResponse)
  }

  function getDocument({ _id }, options) {
    const error = approveId(_id)
    if (error) handleServerErrorSync(`error getting a ${name} record`, error)

    const maybeTransformResponse = getResponseTransform(options),
      axiosOptions = getAxiosOptions(options)

    return couchdb
      .get(`/${name}/${_id}`, axiosOptions)
      .then(maybeTransformResponse)
  }

  function getDocumentAtRevision({ _id, _rev }) {
    const error = approveIdAndRev(_id, _rev)
    if (error) handleServerErrorSync(`error getting a ${name} record`, error)

    return couchdb.get(`/${name}/${_id}?rev=${_rev}`).then(returnData)
  }

  function updateDocument(data) {
    const { _id, _rev } = data,
      error = approveIdAndRev(_id, _rev)
    if (error) handleServerErrorSync(`error updating a ${name} record`, error)

    data = omitAll(['_id', '_rev'])(data)
    return couchdb
      .put(`/${name}/${_id}?rev=${_rev}`, data)
      .then(normalizeData)
      .then(returnData)
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function approveId(_id) {
  if (!_id) return new Error("The key '_id' is missing")
}

function approveIdAndRev(_id, _rev) {
  const missingKeys = []

  if (!_id) missingKeys.push('_id')
  if (!_rev) missingKeys.push('_rev')

  if (isLaden(missingKeys)) {
    return new Error(
      `The following keys are missing: ${join(', ')(missingKeys)}`
    )
  }
}

function createDb(name) {
  return couchdb.put(`/${name}`)
}

async function createDbAndAccessor(name) {
  await createDb(name)
  return createDbAccessor(name)
}

function deleteDb(name, options) {
  const axiosOptions = getAxiosOptions(options)
  return couchdb.delete(`/${name}`, axiosOptions)
}

function getAllDocuments(name) {
  return couchdb
    .get(`/${name}/_all_docs`)
    .then(response =>
      passThrough(response.data.rows, [
        map(row => ({
          _id: row.id,
          _rev: row.value.rev,
        })),
        mMap(({ _id, _rev }) => couchdb.get(`/${name}/${_id}?rev=${_rev}`)),
        resolveAll,
      ])
    )
    .then(map(getValueAt('data')))
}

function getAllIds(name) {
  return couchdb
    .get(`/${name}/_all_docs`)
    .then(response => map(getValueAt('id'))(response.data.rows))
}

function normalizeData(response) {
  //
  // normalize the data
  //   - id => _id
  //   - rev => _rev
  //     ** this keeps the api consistent -> simpler code
  //
  //   - ok => remove
  //     ** unsure why this exists, seems to overlap the http status
  //
  response.data = passThrough(response.data, [
    omit('ok'),
    mapKeys(prepend('_')),
  ])

  return response
}

function replicateAllDbs(fixtureName) {
  return passThrough(databaseNames, [
    map(deletePreviousReplication),
    resolveAll,
    then(flow([mMap(replicate), resolveAll])),
  ])

  // scoped helper functions

  function deletePreviousReplication(dbName) {
    return Promise.all([
      dbName,
      deleteDb(getFixtureDbName(fixtureName, dbName), { allow404: true }),
    ])
  }

  function replicate([dbName]) {
    return couchdb.post(`/_replicate`, {
      id: getFixtureDbName(fixtureName, dbName),
      source: dbName,
      target: getFixtureDbName(fixtureName, dbName),
      create_target: true,
    })
  }
}

function revertToFixture(fixtureName) {
  return passThrough(databaseNames, [
    map(deleteCurrentDb),
    resolveAll,
    then(flow([mMap(restoreFixture), resolveAll])),
  ])

  // scoped helper functions

  function deleteCurrentDb(dbName) {
    return Promise.all([dbName, deleteDb(dbName)])
  }

  function restoreFixture([dbName]) {
    return couchdb.post(`/_replicate`, {
      id: createCouchdbId(),
      source: getFixtureDbName(fixtureName, dbName),
      target: dbName,
      create_target: true,
    })
  }
}

function getFixtureDbName(fixtureName, dbName) {
  return `${fixtureName}_${dbName}`
}

//
//---------//
// Exports //
//---------//

export default api

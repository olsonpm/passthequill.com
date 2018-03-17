import databaseNameToDefinition from './database-name-to-definition'
import { dashelize } from 'universal/utils'
import { mMap } from 'fes'

export default mMap(dashelize)(Object.keys(databaseNameToDefinition))

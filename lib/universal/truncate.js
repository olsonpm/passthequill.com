import { flow, truncateToNLines } from 'fes'
import jstring from './jstring'

const truncate = flow([jstring, truncateToNLines(3)])

export default truncate

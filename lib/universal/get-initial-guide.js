import setOfUnderstandsKeys from './set-of-understands-keys'
import { cloneDeep, mSet, reduce } from 'fes'

const initialGuide = {
  isActive: true,
  understands: reduce(toFalse, {})(setOfUnderstandsKeys),
}

function toFalse(result, key) {
  return mSet(key, false)(result)
}

export default () => cloneDeep(initialGuide)

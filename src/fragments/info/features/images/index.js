import { fromPairs } from 'lodash'
export const FEATURES = [
  'liveness',
  'template-matching',
  'watchlist',
  'facematch',
  'document-reading',
  'curp-validation',
  'alteration-detection'
]

const items = fromPairs(FEATURES.map(name => [name, require(`./${name}.svg`)]))

export default items

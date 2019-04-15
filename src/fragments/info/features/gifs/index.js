import { fromPairs } from 'lodash'
export const FEATURES = [
  ['liveness', 'gif'],
  ['template-matching', 'gif'],
  ['watchlist', 'gif'],
  ['facematch', 'png'],
  ['document-reading', 'gif'],
  ['curp-validation', 'jpg'],
  ['alteration-detection', 'png']
]

const items = fromPairs(
  FEATURES.map(([name, ext]) => [name, require(`./${name}.${ext}`)])
)

export default items

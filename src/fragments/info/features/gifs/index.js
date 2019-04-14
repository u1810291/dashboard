import FEATURES from '../Features'
module.exports = Object.fromPairs(
  FEATURES.map(name => [name, require(`./${name}.gif`)])
)

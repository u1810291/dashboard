import { fromPairs } from 'lodash';

export const FEATURES = [
  'liveness',
  'template-matching',
  'watchlist',
  'facematch',
  'document-reading',
  'curp-validation',
  'alteration-detection',
];

// eslint-disable-next-line global-require,import/no-dynamic-require
const items = fromPairs(FEATURES.map((name) => [name, require(`./${name}.svg`)]));

export default items;

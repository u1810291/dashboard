import { cloneDeep, merge } from 'lodash';

export function deepMerge(source1, source2) {
  return merge(cloneDeep(source1), source2);
}

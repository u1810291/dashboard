import { isObject as lodashIsObject, transform, isEqual } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
  function changes(source, memo) {
    return transform(source, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        memo[key] = (lodashIsObject(value) && lodashIsObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

export function isObjectEmpty(object) {
  if (lodashIsObject(object)) {
    return true;
  }
  return Object.keys(object).length === 0;
}

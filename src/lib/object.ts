import { transform, isEqual, isObject as lodashIsObject } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} values Object compared
 * @param  {Object} initialValues   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(values, initialValues) {
  function changes(object, base) {
    return transform(object, (memo, value, key) => {
      if (!isEqual(value, base[key])) {
        memo[key] = (lodashIsObject(value) && lodashIsObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(values, initialValues);
}

export function isObjectEmpty(object) {
  if (!lodashIsObject(object)) {
    return true;
  }
  return Object.keys(object).length === 0;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function mergeDeep(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Replaces the key in obj with the specified name
 */
export function replaceObjKeyByName<T = {}>(obj: T, key: string, name: string): T {
  const newObj: T = { ...obj, [name]: obj[key] };
  delete newObj[key];

  return newObj;
}

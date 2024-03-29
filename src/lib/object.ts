import { transform, isEqual, isObject as lodashIsObject } from 'lodash';

export type Serializable<T> = {
  [Property in keyof T]?: string | number | boolean;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

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
  if (!isObject(target) || !isObject(source)) {
    return output;
  }

  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!(key in target)) Object.assign(output, { [key]: source[key] });
      else output[key] = mergeDeep(target[key], source[key]);
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });

  return output;
}

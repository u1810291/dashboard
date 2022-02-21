import { cloneDeep } from 'lodash';

export function getSettingsValueByType<T, S extends string>(settings: T): Record<S, any> {
  const innerSettings = cloneDeep(settings);

  return Object.entries(innerSettings)
    .reduce((result, [key, value]) => {
      const newResult = { ...result };
      newResult[key] = value?.value;
      return newResult;
    }, {} as Record<S, any>);
}

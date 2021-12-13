export interface Loadable<T> {
  isLoaded: boolean;
  isLoading: boolean;
  isFailed: boolean;
  error: string;
  value: T;
}

export type LoadableSelector<T = any> = (value: any, ...args: any) => T;

export type LoadableModelSelector = (model: Loadable<any>, ...args: any) => Loadable<any>;

export type LoadableValueSelector<T = any> = (model: Loadable<any>, ...args: any) => T;

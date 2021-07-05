export interface Loadable<T> {
  isLoaded: boolean;
  isLoading: boolean;
  isFailed: boolean;
  error: string;
  value: T;
}

export type LoadableSelector = (value: any, ...args: any) => any;

export type LoadableModelSelector = (model: Loadable<any>, ...args: any) => Loadable<any>;

export type LoadableValueSelector = (model: Loadable<any>, ...args: any) => any;

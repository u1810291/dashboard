import { AnyAction, Reducer } from 'redux';

export enum ActionSubTypes {
  Request = 'REQUEST',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Updating = 'UPDATING',
  Clear = 'CLEAR',
}

export type TypesSequence = {
  [key: string]: string;
};

export const storeAction = <T>(type: string) => (payload: T) => (dispatch) => dispatch({ type, payload });
export type ReducerHandlers<State> = { [key: string]: (state: State, action: AnyAction & { isReset?: boolean }) => State }

export function createReducer<State>(initialState: State, handlers: ReducerHandlers<State>): Reducer<State, AnyAction> {
  return function reducer(state = initialState, action: AnyAction) {
    if (!Object.hasOwnProperty.call(handlers, action.type)) {
      return state;
    }
    return handlers[action.type](state, action);
  };
}

export function createTypesSequence<T>(baseName: T): TypesSequence {
  return Object.values(ActionSubTypes).reduce((memo, item) => {
    const type = `${baseName}_${item}`;
    memo[type] = type;
    return memo;
  }, {});
}

export function collectionUpsert(collection = [], value, id = '_id') {
  if (!value[id]) {
    console.error('object has no id', value);
    return collection;
  }

  const index = collection.findIndex((item) => item[id] === value[id]);
  if (index > -1) {
    // update
    const newCollection = [
      ...collection,
    ];
    newCollection.splice(index, 1, value);
    return newCollection;
  }
  // insert
  return [
    ...collection,
    value,
  ];
}

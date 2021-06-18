export enum ActionSubTypes {
  Request = 'REQUEST',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  Updating = 'UPDATING',
  Clear = 'CLEAR',
}

export type TypesSequence = {
  [key: string]: string,
};

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export function createTypesSequence<T extends string>(baseName: T): TypesSequence {
  return Object.values(ActionSubTypes).reduce((memo, item) => {
    const type = `${baseName}_${item}`;
    memo[type] = type;
    return memo;
  }, {}) as TypesSequence;
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

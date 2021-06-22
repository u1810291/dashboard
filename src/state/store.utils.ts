export const ActionSubTypes = {
  Request: 'REQUEST',
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Updating: 'UPDATING',
  Clear: 'CLEAR',
};

export const storeAction = <T>(type: string) => (payload: T) => (dispatch) => dispatch({ type, payload });

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (!Object.hasOwnProperty.call(handlers, action.type)) {
      return state;
    }
    return handlers[action.type](state, action);
  };
}

export function createTypesSequence(baseName) {
  return [
    ActionSubTypes.Request,
    ActionSubTypes.Success,
    ActionSubTypes.Failure,
    ActionSubTypes.Updating,
    ActionSubTypes.Clear,
  ].reduce((memo, item) => {
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

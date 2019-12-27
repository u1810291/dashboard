export const ActionSubTypes = {
  Request: 'REQUEST',
  Success: 'SUCCESS',
  Failure: 'FAILURE',
  Updating: 'UPDATING',
  Updated: 'UPDATED',
};

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function createTypesSequence(baseName) {
  return [
    ActionSubTypes.Request,
    ActionSubTypes.Success,
    ActionSubTypes.Failure,
    ActionSubTypes.Updating,
    ActionSubTypes.Updated,
  ].reduce((object, item) => {
    const type = `${baseName}_${item}`;
    object[type] = type;
    return object;
  }, {});
}

export function collectionUpsert(collection, value, id = '_id') {
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
  } else {
    // insert
    return [
      ...collection,
      value,
    ];
  }
}

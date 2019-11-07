export const ActionSubTypes = {
  Request: 'REQUEST',
  Success: 'SUCCESS',
  Failure: 'FAILURE',
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
  ].reduce((object, item) => {
    const type = `${baseName}_${item}`;
    object[type] = type;
    return object;
  }, {});
}

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
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((object, item) => {
    const type = `${baseName}_${item}`;
    object[type] = type;
    return object;
  }, {});
}

export const YEAR_MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
});

export const YEAR_MONTH_SHORT_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
});

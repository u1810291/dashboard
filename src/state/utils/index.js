export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createTypesSequence(baseName) {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((object, item) => {
    const type = `${baseName}_${item}`
    object[type] = type
    return object
  }, {})
}

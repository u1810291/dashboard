export const types = {
  CREATE_EMPTY_FLOW: 'CREATE_EMPTY_FLOW',
};

export const createEmptyFlow = () => (dispatch) => {
  dispatch({ type: types.CREATE_EMPTY_FLOW });
};

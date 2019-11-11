import { createReducer } from 'state/utils';
import { types } from './collaborator.actions';

const initialState = {
  isLoading: true,
  isPosting: false,
  isDeleting: false,
  isPatchingArray: [],
  collaborators: [],
};

export default createReducer(initialState, {
  [types.COLLABORATORS_GET_SUCCESS](state, { payload }) {
    return {
      ...state,
      collaborators: payload.data,
      isLoading: false,
    };
  },
  [types.COLLABORATORS_POST_REQUEST](state) {
    return {
      ...state,
      isPosting: true,
    };
  },
  [types.COLLABORATORS_POST_SUCCESS](state, { payload }) {
    return {
      ...state,
      collaborators: payload.data,
      isPosting: false,
    };
  },
  [types.COLLABORATORS_POST_FAILURE](state) {
    return {
      ...state,
      isPosting: false,
    };
  },
  [types.COLLABORATORS_PATCH_REQUEST](state, { id }) {
    const isPatchingArray = [].concat(state.isPatchingArray);
    isPatchingArray.push(id);
    return {
      ...state,
      isPatchingArray,
    };
  },
  [types.COLLABORATORS_PATCH_SUCCESS](state, { payload, id }) {
    let isPatchingArray = [].concat(state.isPatchingArray);
    isPatchingArray = isPatchingArray.filter((item) => item !== id);
    return {
      ...state,
      collaborators: payload.data,
      isPatchingArray,
    };
  },
  [types.COLLABORATORS_DELETE_REQUEST](state) {
    return {
      ...state,
      isDeleting: true,
    };
  },
  [types.COLLABORATORS_DELETE_SUCCESS](state, { payload }) {
    return {
      ...state,
      isDeleting: false,
      collaborators: payload.data,
    };
  },
});

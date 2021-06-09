import { createReducer } from 'state/utils';
import { OverlayActionTypes } from './overlay.store';

const initialState = {
  overlay: null,
};

export default createReducer(initialState, {
  [OverlayActionTypes.CREATE_OVERLAY](state, { payload }) {
    return {
      ...state,
      overlay: payload,
    };
  },
  [OverlayActionTypes.CLOSE_OVERLAY](state) {
    return {
      ...state,
      overlay: null,
    };
  },
});

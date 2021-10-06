import { createReducer } from 'state/store.utils';
import { OverlayStore } from './overlay.store';
import { OverlayActionTypes } from './overlay.actions';

const initialState: OverlayStore = {
  overlayStack: [],
};

export default createReducer(initialState, {
  [OverlayActionTypes.CREATE_OVERLAY](state, { payload }) {
    return {
      ...state,
      overlayStack: [...state.overlayStack, payload],
    };
  },
  [OverlayActionTypes.CLOSE_OVERLAY](state) {
    return {
      ...state,
      overlayStack: state.overlayStack.slice(0, -1),
    };
  },
  [OverlayActionTypes.CLOSE_ALL_OVERLAYS](state) {
    return {
      ...state,
      overlayStack: [],
    };
  },
});

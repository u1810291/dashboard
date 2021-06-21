import { createReducer } from 'state/store.utils';
import { types } from './dashboard.actions';

const initialState = {
  isDesktopMenuOpen: true,
};

export default createReducer(initialState, {
  [types.SET_IS_DESKTOP_MENU_OPEN](state, { payload }) {
    return {
      isDesktopMenuOpen: payload,
    };
  },
});

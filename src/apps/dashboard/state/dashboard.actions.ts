export const types = {
  SET_IS_DESKTOP_MENU_OPEN: 'SET_IS_DESKTOP_MENU_OPEN',
};

export const setIsDesktopMenuOpen = (flag) => (dispatch) => {
  dispatch({ type: types.SET_IS_DESKTOP_MENU_OPEN, payload: flag });
};

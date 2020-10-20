import { OverlayActionTypes } from './overlay.store';

export const overlayCreate = (payload) => (dispatch) => {
  dispatch({ type: OverlayActionTypes.CREATE_OVERLAY, payload });
};

export const overlayClose = () => (dispatch) => {
  dispatch({ type: OverlayActionTypes.CLOSE_OVERLAY });
};

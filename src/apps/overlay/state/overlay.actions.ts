import { OverlayI } from '../models/Overlay.model';

export enum OverlayActionTypes {
  CREATE_OVERLAY = 'CREATE_OVERLAY',
  CLOSE_OVERLAY = 'CLOSE_OVERLAY',
  CLOSE_ALL_OVERLAYS = 'CLOSE_ALL_OVERLAYS',
}

export const overlayCreate = (payload: OverlayI) => (dispatch) => {
  dispatch({ type: OverlayActionTypes.CREATE_OVERLAY, payload });
};

export const overlayClose = () => (dispatch) => {
  dispatch({ type: OverlayActionTypes.CLOSE_OVERLAY });
};

export const overlayCloseAll = () => (dispatch) => {
  dispatch({ type: OverlayActionTypes.CLOSE_ALL_OVERLAYS });
};

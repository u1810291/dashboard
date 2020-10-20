import { createSelector } from 'reselect';
import { OVERLAY_STORE_KEY } from './overlay.store';

const overlayStore = (state) => state[OVERLAY_STORE_KEY];

export const selectOverlay = createSelector(
  overlayStore,
  (store) => store.overlay,
);

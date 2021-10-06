import { createSelector } from 'reselect';
import { OverlayI } from '../models/Overlay.model';
import { OVERLAY_STORE_KEY, OverlayStore } from './overlay.store';

const overlayStore = (state) => state[OVERLAY_STORE_KEY];

export const selectOverlayStack = createSelector<any, OverlayStore, OverlayI[]>(
  overlayStore,
  (store: OverlayStore) => store.overlayStack,
);

import { createSelector } from 'reselect';
import { OverlayI } from '../models/Overlay.model';
import { OVERLAY_STORE_KEY, OverlayStore } from './overlay.store';

const overlayStore = (state: {OVERLAY_STORE_KEY: OverlayStore}): OverlayStore => state[OVERLAY_STORE_KEY];

export const selectOverlayStack = createSelector<[typeof overlayStore], OverlayI[]>(
  overlayStore,
  (store: OverlayStore) => store.overlayStack,
);

import { OverlayI } from '../models/Overlay.model';

export const OVERLAY_STORE_KEY = 'overlay';

export interface OverlayStore {
  overlayStack: OverlayI[];
}

import { createSelector } from 'reselect';
import { DASHBOARD_STORE_KEY } from './dashboard.store';

const selectDashboardStore = (state) => state[DASHBOARD_STORE_KEY];

export const selectIsDesktopMenuOpen = createSelector(
  selectDashboardStore,
  (dashboard) => dashboard.isDesktopMenuOpen,
);

import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { selectDashboardModel } from 'state/merchant/merchant.selectors';
import dayjs from 'dayjs';
import { DASHBOARD_STORE_KEY } from './dashboard.store';

const selectDashboardStore = (state) => state[DASHBOARD_STORE_KEY];

export const selectIsDesktopMenuOpen = createSelector<any, any, boolean>(
  selectDashboardStore,
  (dashboard) => dashboard.isDesktopMenuOpen,
);

export const selectIsNewDesign = createSelector<any, any, boolean>(
  selectDashboardModel,
  selectModelValue((dashboard) => !dashboard.showOldDesignUntil || dayjs.utc().isAfter(dashboard.showOldDesignUntil)),
);

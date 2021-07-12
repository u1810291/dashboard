import moment from 'moment';
import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { selectDashboardModel } from 'state/merchant/merchant.selectors';
import { DASHBOARD_STORE_KEY } from './dashboard.store';

const selectDashboardStore = (state) => state[DASHBOARD_STORE_KEY];

export const selectIsDesktopMenuOpen = createSelector(
  selectDashboardStore,
  (dashboard) => dashboard.isDesktopMenuOpen,
);

export const selectIsNewDesign = createSelector(
  selectDashboardModel,
  selectModelValue((dashboard) => !dashboard.showOldDesignUntil || moment.utc().isAfter(dashboard.showOldDesignUntil)),
);

import { createSelector } from 'reselect';
import { selectModelValue } from 'lib/loadable.selectors';
import { selectDashboardModel } from 'state/merchant/merchant.selectors';
import dayjs from 'dayjs';
import { DASHBOARD_STORE_KEY } from './dashboard.store';

type IDashboardStore = any;

const selectDashboardStore = (state: { DASHBOARD_STORE_KEY: IDashboardStore }): IDashboardStore => state[DASHBOARD_STORE_KEY];

export const selectIsDesktopMenuOpen = createSelector<[typeof selectDashboardStore], boolean>(
  selectDashboardStore,
  (dashboard) => dashboard.isDesktopMenuOpen,
);

export const selectIsNewDesign = createSelector<[typeof selectDashboardModel], boolean>(
  selectDashboardModel,
  selectModelValue((dashboard) => !dashboard.showOldDesignUntil || dayjs.utc().isAfter(dashboard.showOldDesignUntil)),
);

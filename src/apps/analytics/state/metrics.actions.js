import * as api from 'apps/analytics/api/analytics.client';
import { metricsActionGroups } from 'apps/analytics/state/metrics.store';
import { filterSerialize } from 'models/Filter.model';
import { createSelector } from 'reselect';
import { selectIdentityStore } from 'state/identities/identities.selectors';
import { SliceNames } from 'state/identities/identities.store';
import { createTypesSequence } from 'state/store.utils';

export const metricsActionTypes = {
  ...createTypesSequence(metricsActionGroups.Metrics),
  ...createTypesSequence(metricsActionGroups.Chart),
  ...createTypesSequence(metricsActionGroups.Filter),
  ...createTypesSequence(metricsActionGroups.Statistics),
  ...createTypesSequence(metricsActionGroups.CountriesOnlyExisting),
  ...createTypesSequence(metricsActionGroups.IpCheckStatistics),
  FILTER_UPDATE: 'metrics/FILTER_UPDATE',
};

export const filterUpdate = (data) => (dispatch) => {
  dispatch({ type: metricsActionTypes.FILTER_UPDATE, payload: data });
};

export const selectIdentityCollection = createSelector(
  selectIdentityStore,
  (store) => store[SliceNames.IdentityList],
);

export const loadChartStatistics = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.CHART_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getStatistics(serializedFilter);
    dispatch({ type: metricsActionTypes.CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.CHART_FAILURE, error });
    throw error;
  }
};

export const countStatisticsLoad = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.STATISTICS_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getCountStatistics(serializedFilter);
    dispatch({ type: metricsActionTypes.STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.STATISTICS_FAILURE, error });
    throw error;
  }
};

export const getIpCheckStatistics = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.IP_CHECK_STATISTICS_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getIpCheckStatistics(serializedFilter);
    dispatch({ type: metricsActionTypes.IP_CHECK_STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.IP_CHECK_STATISTICS_FAILURE, error });
    throw error;
  }
};

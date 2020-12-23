import * as api from 'apps/analytics/api/analytics.client';
import { metricsActionGroups } from 'apps/analytics/state/metrics.store';
import { filterSerialize } from 'models/Filter.model';
import { createSelector } from 'reselect';
import { selectIdentityStore } from 'state/identities/identities.selectors';
import { SliceNames } from 'state/identities/identities.store';
import { createTypesSequence } from 'state/utils';

export const metricsActionTypes = {
  ...createTypesSequence(metricsActionGroups.Metrics),
  ...createTypesSequence(metricsActionGroups.Statistics),
  ...createTypesSequence(metricsActionGroups.Filter),
  ...createTypesSequence(metricsActionGroups.VerificationsCount),
  ...createTypesSequence(metricsActionGroups.DocumentsCount),
  ...createTypesSequence(metricsActionGroups.DevicesStatistics),
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

export const loadMetrics = () => async (dispatch) => {
  dispatch({ type: metricsActionTypes.METRICS_REQUEST });
  try {
    const { data } = await api.getMetrics();
    dispatch({ type: metricsActionTypes.METRICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.METRICS_FAILURE, error });
    throw error;
  }
};

export const loadStatistics = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.STATISTICS_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getStatistics(serializedFilter);
    dispatch({ type: metricsActionTypes.STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.STATISTICS_FAILURE, error });
    throw error;
  }
};

export const loadVerificationsCount = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.VERIFICATIONS_COUNT_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getVerificationsCount(serializedFilter);
    dispatch({ type: metricsActionTypes.VERIFICATIONS_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.VERIFICATIONS_COUNT_FAILURE, error });
    throw error;
  }
};

export const loadDocumentsCount = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.DOCUMENTS_COUNT_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getDocumentsCount(serializedFilter);
    dispatch({ type: metricsActionTypes.DOCUMENTS_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.DOCUMENTS_COUNT_FAILURE, error });
    throw error;
  }
};

export const loadDevicesStatistics = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.DEVICES_STATISTICS_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getDevicesStatistics(serializedFilter);
    dispatch({ type: metricsActionTypes.DEVICES_STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.DEVICES_STATISTICS_FAILURE, error });
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

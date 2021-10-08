import { FilterI, filterSerialize } from 'models/Filter.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';
import * as api from '../api/Analytics.client';
import { AnalyticsActionGroups } from './Analytics.store';

export const metricsActionTypes: TypesSequence = {
  ...createTypesSequence(AnalyticsActionGroups.Chart),
  ...createTypesSequence(AnalyticsActionGroups.Filter),
  ...createTypesSequence(AnalyticsActionGroups.Statistics),
  ...createTypesSequence(AnalyticsActionGroups.IpCheckStatistics),
  FILTER_UPDATE: 'metrics/FILTER_UPDATE',
};

export const filterUpdate = (data: FilterI) => (dispatch) => {
  dispatch({ type: metricsActionTypes.FILTER_UPDATE, payload: data });
};

export const loadChartStatistics = (filter: FilterI, asMerchantId: string) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.CHART_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getStatistics({ ...serializedFilter, ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: metricsActionTypes.CHART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.CHART_FAILURE, error });
    throw error;
  }
};

export const countStatisticsLoad = (filter: FilterI, asMerchantId: string) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.STATISTICS_REQUEST });
  try {
    const serializedFilter = filterSerialize(filter);
    const { data } = await api.getCountStatistics({ ...serializedFilter, ...(asMerchantId && { asMerchantId }) });
    dispatch({ type: metricsActionTypes.STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.STATISTICS_FAILURE, error });
    throw error;
  }
};

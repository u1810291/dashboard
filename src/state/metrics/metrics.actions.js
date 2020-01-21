import * as api from 'lib/client/metrics';
import { createTypesSequence } from 'state/utils';
import { metricsActionGroups } from './metrics.model';

export const metricsActionTypes = {
  ...createTypesSequence(metricsActionGroups.Metrics),
  ...createTypesSequence(metricsActionGroups.Statistics),
};

export const getMetrics = () => async (dispatch) => {
  dispatch({ type: metricsActionTypes.METRICS_REQUEST });
  try {
    const { data } = await api.getMetrics();
    dispatch({ type: metricsActionTypes.METRICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.METRICS_FAILURE, error });
    throw error;
  }
};

export const getStatistics = (filter) => async (dispatch) => {
  dispatch({ type: metricsActionTypes.STATISTICS_REQUEST });
  try {
    const { data } = await api.getStatistics(filter);
    dispatch({ type: metricsActionTypes.STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.STATISTICS_FAILURE, error });
    throw error;
  }
};

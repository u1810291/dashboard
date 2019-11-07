import { selectAuthToken } from 'state/auth/auth.selectors';
import { createTypesSequence } from 'state/utils';
import * as api from 'lib/client/metrics';

export const metricsActionGroups = {
  Metrics: 'METRICS',
  Statistics: 'STATISTICS',
};

export const metricsActionTypes = {
  ...createTypesSequence(metricsActionGroups.Metrics),
  ...createTypesSequence(metricsActionGroups.Statistics),
};

export const getMetrics = () => async (dispatch, getState) => {
  dispatch({ type: metricsActionTypes.METRICS_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getMetrics(token);
    dispatch({ type: metricsActionTypes.METRICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.METRICS_FAILURE, error });
    throw error;
  }
};

export const getStatistics = (filter) => async (dispatch, getState) => {
  dispatch({ type: metricsActionTypes.STATISTICS_REQUEST });
  try {
    const token = selectAuthToken(getState());
    const { data } = await api.getStatistics(token, filter);
    dispatch({ type: metricsActionTypes.STATISTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: metricsActionTypes.STATISTICS_FAILURE, error });
    throw error;
  }
};

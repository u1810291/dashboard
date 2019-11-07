import { LoadableAdapter } from 'lib/loadable.adapter';

export function selectMetrics({ metrics }) {
  return LoadableAdapter.get(metrics.metrics);
}

export function selectStatistics({ metrics }) {
  return LoadableAdapter.get(metrics.statistics);
}

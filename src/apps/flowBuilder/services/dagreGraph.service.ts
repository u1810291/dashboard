import dagre from 'dagre';

export const EDGE_HEIGHT = 20;

export const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setGraph({
  rankdir: 'TB',
  ranksep: EDGE_HEIGHT,
});
dagreGraph.setDefaultEdgeLabel(() => ({}));

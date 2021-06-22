import dagre from 'dagre';

export const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setGraph({
  rankdir: 'TB',
});
dagreGraph.setDefaultEdgeLabel(() => ({}));

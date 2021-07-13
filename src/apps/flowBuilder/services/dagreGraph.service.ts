import dagre from 'dagre';

export const EDGE_HEIGHT = 20;

export class DagreGraphService {
  private dagreGraph;

  createGraph() {
    const newDagreGraph = new dagre.graphlib.Graph();
    newDagreGraph.setGraph({
      rankdir: 'TB',
      ranksep: EDGE_HEIGHT,
    });
    newDagreGraph.setDefaultEdgeLabel(() => ({}));
    this.dagreGraph = newDagreGraph;
  }

  getGraph() {
    return this.dagreGraph;
  }
}

export const dagreGraphService = new DagreGraphService();

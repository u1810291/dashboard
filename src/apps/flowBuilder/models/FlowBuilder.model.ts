import { ProductNode } from 'apps/flowBuilder/components/ProductNode/ProductNode';
import { StatusNode } from 'apps/flowBuilder/components/StatusNode/StatusNode';
import { dagreGraph } from 'apps/flowBuilder/services/dagreGraph.service';
import dagre from 'dagre';
import { IdentityStatuses } from 'models/Status.model';
import { isNode, Position } from 'react-flow-renderer';
import { DropZoneNode } from '../components/DropZoneNode/DropZoneNode';

// TODO: @ggrigorev set somehow at the center of graph. Maybe fit into view at first render
export const X_AXIS_COORDINATE = 0;

export enum NodeTypes {
  DropZone = 'dropZone',
  Product = 'product',
  Status = 'status',
}

export const NodesMap = {
  [NodeTypes.DropZone]: DropZoneNode,
  [NodeTypes.Product]: ProductNode,
  [NodeTypes.Status]: StatusNode,
};

export const StatusNodesOrder = [
  IdentityStatuses.verified,
  IdentityStatuses.rejected,
  IdentityStatuses.reviewNeeded,
];

export enum NonProductSettings {
  IntegrationType = 'integrationType',
}

export function areNodesLoaded(nodes, elements) {
  if (nodes.length !== Math.floor(elements.length / 2) + 1) {
    return false;
  }
  // eslint-disable-next-line no-underscore-dangle
  return nodes.every((node) => node.__rf.height !== null || node.__rf.width !== null);
}

export function getElements(productsInFlow) {
  const position = { x: 0, y: 0 }; // calculated at getLayoutedElements()
  const nodes: any[] = productsInFlow.map((productType) => ({ id: productType, type: NodeTypes.Product, position }));
  nodes.push({ id: NodeTypes.DropZone, type: NodeTypes.DropZone, position });

  const edges = nodes.reduce((edgesArr, node, i) => {
    const nextNode = nodes[i + 1];
    if (!nextNode) {
      return edgesArr;
    }
    return [...edgesArr, {
      id: `${node.id}-${nextNode.id}`,
      source: node.id,
      target: nextNode.id,
    }];
  }, []);

  StatusNodesOrder.forEach((statusType) => {
    nodes.push({ id: statusType, type: NodeTypes.Status, position });
    edges.push({ id: `${NodeTypes.DropZone}-${statusType}`, source: NodeTypes.DropZone, target: statusType, type: 'step' });
  });
  return [...nodes, ...edges];
}

function getStatusCoordinate(id) {
  switch (id) {
    case IdentityStatuses.verified:
      return X_AXIS_COORDINATE - 100;
    case IdentityStatuses.rejected:
      return X_AXIS_COORDINATE;
    case IdentityStatuses.reviewNeeded:
      return X_AXIS_COORDINATE + 100;
    default:
      return X_AXIS_COORDINATE;
  }
}

export function getLayoutedElements(nodes, elements) {
  elements.forEach((el) => {
    if (isNode(el)) {
      const { __rf: nodePosition } = nodes.find((node) => node.id === el.id);
      dagreGraph.setNode(el.id, { width: nodePosition?.width, height: nodePosition?.height });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      const { __rf: nodeWithParams } = nodes.find((node) => node.id === el.id);
      // eslint-disable-next-line no-param-reassign
      el.targetPosition = Position.Top;
      // eslint-disable-next-line no-param-reassign
      el.sourcePosition = Position.Bottom;
      const xPos = el.type === NodeTypes.Status ? getStatusCoordinate(el.id) : X_AXIS_COORDINATE;
      // eslint-disable-next-line no-param-reassign
      el.position = {
        x: xPos - nodeWithParams?.width / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeWithParams?.height / 2,
      };
    }

    return el;
  });
}

export const stepStatusesStub = [
  {
    id: '1',
    text: 'Duplicate user detection',
  },
  {
    id: '2',
    text: 'Duplicate user detection',
  },
  {
    id: '3',
    text: 'Duplicate user detection',
  },
  {
    id: '4',
    text: 'Duplicate user detection',
  },
  {
    id: '5',
    text: 'Duplicate user detection',
  },
];

export const usersCountStub = 1234;

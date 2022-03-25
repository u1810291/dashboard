import { DropZoneNode, ProductNode } from 'apps/WorkflowBuilder';
import { dagreGraphService, EDGE_HEIGHT } from 'apps/WorkflowBuilder/services/dagreGraph.service';
import { appPalette } from 'apps/theme';
import dagre from 'dagre';
import cloneDeep from 'lodash/cloneDeep';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { GDPRRangeTypes } from 'models/GDPR.model';
import { ProductTypes } from 'models/Product.model';
import { Elements, isNode, Node, Position } from 'react-flow-renderer';

export const X_AXIS_COORDINATE = 0;

export interface FlowSettingsModel {
  policyInterval: string;
  digitalSignature: DigitalSignatureProvider;
  flowName: string;
}

export enum DaysRangeErrorTypes {
  empty = 'empty',
  outOfRange = 'outOfRange',
}

export enum NodeTypes {
  DropZone = 'dropZone',
  Product = 'product',
}

export const NodesMap = {
  [NodeTypes.DropZone]: DropZoneNode,
  [NodeTypes.Product]: ProductNode,
};

export enum WebhookInputTypes {
  Secret = 'secret',
  Url = 'url',
}

export function areNodesLoaded(loadedNodes: Node[], elements: Elements): boolean {
  if (loadedNodes.length !== Math.floor(elements.length / 2) + 1) {
    return false;
  }
  // eslint-disable-next-line no-underscore-dangle
  return loadedNodes.every((node) => node.__rf.height !== null || node.__rf.width !== null);
}

export function getElements(productsInGraph: ProductTypes[]): Elements {
  const position = { x: 0, y: 0 }; // real position is calculated at getLayoutedElements()
  const nodes: any[] = productsInGraph.map((productType) => ({ id: productType, type: NodeTypes.Product, position }));
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
      style: {
        stroke: appPalette.black50,
        strokeWidth: 2,
      },
    }];
  }, []);

  return [...nodes, ...edges];
}

export function getLayoutedElements(nodes: Node[], elements: Elements): Elements {
  elements.forEach((el) => {
    if (isNode(el)) {
      const { __rf: nodePosition } = nodes.find((node) => node.id === el.id);
      dagreGraphService.getGraph().setNode(el.id, { width: nodePosition?.width, height: nodePosition?.height });
    } else {
      dagreGraphService.getGraph().setEdge(el.source, el.target);
    }
  });
  dagre.layout(dagreGraphService.getGraph());

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraphService.getGraph().node(el.id);
      const { __rf: nodeWithParams } = nodes.find((node) => node.id === el.id);
      return {
        ...el,
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        position: {
          // Math.random required to inform react-flow about changes
          x: X_AXIS_COORDINATE - nodeWithParams?.width / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeWithParams?.height / 2,
        },
      };
    }
    return el;
  });
}

export function getTotalGraphHeight(nodes: Node[]): number {
  // eslint-disable-next-line no-underscore-dangle
  const sumOfNodesHeights = nodes.reduce((sum, node) => sum + node?.__rf?.height, 0);
  const sumOfEdgesHeights = (nodes.length - 1) * EDGE_HEIGHT;
  return sumOfNodesHeights + sumOfEdgesHeights + 10;
}

export function getSettingsValueByType<T, S extends string>(settings: T): Record<S, any> {
  const innerSettings = cloneDeep(settings);

  return Object.entries(innerSettings)
    .reduce((result, [key, value]) => {
      const newResult = { ...result };
      newResult[key] = value?.value;
      return newResult;
    }, {} as Record<S, any>);
}

export function validatePolicyInterval(value: number): DaysRangeErrorTypes {
  if (!value) {
    return DaysRangeErrorTypes.empty;
  }
  if (value < GDPRRangeTypes.From || value > GDPRRangeTypes.To) {
    return DaysRangeErrorTypes.outOfRange;
  }
  return null;
}

import { cloneDeep } from 'lodash';
import { DropZoneNode, NodeTypes } from 'apps/WorkflowBuilder';
import { ProductNode } from '../components/ProductNode/ProductNode';

export function getSettingsValueByType<T, S extends string>(settings: T): Record<S, any> {
  const innerSettings = cloneDeep(settings);

  return Object.entries(innerSettings)
    .reduce((result, [key, value]) => {
      const newResult = { ...result };
      newResult[key] = value?.value;
      return newResult;
    }, {} as Record<S, any>);
}

export const NodesMapOld = {
  [NodeTypes.DropZone]: DropZoneNode,
  [NodeTypes.Product]: ProductNode,
};

import { cloneDeep } from 'lodash';
import { NodeTypes } from 'apps/WorkflowBuilder';
import { DropZoneNodeOld } from 'apps/flowBuilder/components/DropZoneNodeOld/DropZoneNodeOld';
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
  [NodeTypes.DropZone]: DropZoneNodeOld,
  [NodeTypes.Product]: ProductNode,
};

import React, { DragEventHandler, memo } from 'react';
import ReactFlow, { Elements } from 'react-flow-renderer';
import { OnLoadFunc } from 'react-flow-renderer/dist/types';
import { NodesMapOld } from '../../models/FlowBuilder.model';

export interface CustomReactFlowProps {
  elements: Elements;
  onDragOver: DragEventHandler;
  onLoad: OnLoadFunc;
}

export function CustomReactFlow({ elements, onDragOver, onLoad }: CustomReactFlowProps) {
  return (
    <ReactFlow
      elements={elements}
      nodeTypes={NodesMapOld}
      onDragOver={onDragOver}
      onLoad={onLoad}
      zoomOnScroll={false}
      paneMoveable={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      nodesDraggable={false}
      nodesConnectable={false}
    />
  );
}

export const CustomReactFlowMemorised = memo(CustomReactFlow);

import { Box } from '@material-ui/core';
import { ReactFlowCustomHandler } from 'apps/flowBuilder/components/ReactFlowCustomHandler/ReactFlowCustomHandler';
import { dagreGraph } from 'apps/flowBuilder/services/dagreGraph.service';
import { flowBuilderProductRemove, flowBuilderProductSelect } from 'apps/flowBuilder/store/FlowBuilder.action';
import { ProductCard } from 'apps/Product';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';

export function ProductNode({ id }) {
  const dispatch = useDispatch();

  const handleRemove = useCallback(() => {
    dispatch(flowBuilderProductRemove(id));
    dagreGraph.removeNode(id);
    // TODO: @ggrigorev clear rightPanel
  }, [dispatch, id]);

  const handleSelect = useCallback(() => {
    dispatch(flowBuilderProductSelect(id));
  }, [dispatch, id]);

  return (
    <Box mt={0.5} minWidth={300}>
      <ProductCard
        id={id}
        isControls
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Box>
  );
}

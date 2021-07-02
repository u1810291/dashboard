import { Box } from '@material-ui/core';
import { ProductCard } from 'apps/Product';
import { useProductRemoving } from 'apps/Product/hooks/ProductRemoving.hook';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { flowBuilderProductRemove, flowBuilderProductSelect } from '../../store/FlowBuilder.action';
import { dagreGraph } from '../../services/dagreGraph.service';
import { ReactFlowCustomHandler } from '../ReactFlowCustomHandler/ReactFlowCustomHandler';

export function ProductNode({ id }: {
  id: ProductTypes,
}) {
  const dispatch = useDispatch();
  const removeProduct = useProductRemoving();

  const handleRemoveProduct = useCallback((productType) => {
    dispatch(flowBuilderProductRemove(productType));
    dagreGraph.removeNode(productType);
  }, [dispatch]);

  const handleRemoveCard = useCallback(() => {
    removeProduct(id, handleRemoveProduct);
  }, [handleRemoveProduct, id, removeProduct]);

  const handleSelect = useCallback(() => {
    dispatch(flowBuilderProductSelect(id));
  }, [dispatch, id]);

  return (
    <Box width={300} position="relative">
      <ProductCard
        id={id}
        isControls
        isIssues
        onSelect={handleSelect}
        onRemove={handleRemoveCard}
      />
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Box>
  );
}

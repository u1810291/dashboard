import { Box } from '@material-ui/core';
import { ProductCard } from 'apps/Product';
import { useProductRemoving } from 'apps/Product/hooks/ProductRemoving.hook';
import classNames from 'classnames';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './ProductNode.styles';
import { dagreGraphService } from '../../services/dagreGraph.service';
import { selectFlowBuilderSelectedId } from '../../store/FlowBuilder.selectors';
import { flowBuilderProductRemove, flowBuilderProductSelect } from '../../store/FlowBuilder.action';
import { ReactFlowCustomHandler } from '../ReactFlowCustomHandler/ReactFlowCustomHandler';

export function ProductNode({ id }: {
  id: ProductTypes;
}) {
  const dispatch = useDispatch();
  const removeProduct = useProductRemoving();
  const selectedProduct = useSelector<ProductTypes>(selectFlowBuilderSelectedId);
  const classes = useStyles();

  const handleRemoveProduct = useCallback((productType) => {
    dispatch(flowBuilderProductRemove(productType));
    dagreGraphService.getGraph().removeNode(productType);
  }, [dispatch]);

  const handleRemoveCard = useCallback(() => {
    removeProduct(id, handleRemoveProduct);
  }, [handleRemoveProduct, id, removeProduct]);

  const handleSelect = useCallback(() => {
    dispatch(flowBuilderProductSelect(id));
  }, [dispatch, id]);

  return (
    <Box width={300} position="relative" className={classNames(classes.root, { [classes.selected]: selectedProduct === id })}>
      <ProductCard
        id={id}
        isControls
        isIssues
        onSelect={handleSelect}
        onRemove={handleRemoveCard}
        isExpandable={false}
        defaultExpanded={false}
      />
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Box>
  );
}

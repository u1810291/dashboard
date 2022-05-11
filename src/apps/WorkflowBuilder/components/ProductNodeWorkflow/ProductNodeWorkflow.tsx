import Box from '@material-ui/core/Box';
import { ProductCard, useProductRemoving } from 'apps/Product';
import classNames from 'classnames';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { ReactFlowCustomHandler } from '../ReactFlowCustomHandler/ReactFlowCustomHandler';
import { workflowBuilderProductRemove, workflowBuilderProductSelect } from '../../store/WorkflowBuilder.action';
import { useStyles } from './ProductNodeWorkflow.styles';
import { selectWorkflowBuilderSelectedId } from '../../store/WorkflowBuilder.selectors';
import { dagreGraphService } from '../../services/dagreGraph.service';

export function ProductNodeWorkflow({ id }: {
  id: ProductTypes;
}) {
  const dispatch = useDispatch();
  const removeProduct = useProductRemoving();
  const selectedProduct = useSelector<any, ProductTypes>(selectWorkflowBuilderSelectedId);
  const classes = useStyles();

  const handleRemoveProduct = useCallback((productType: ProductTypes) => {
    dispatch(workflowBuilderProductRemove(productType));
    dagreGraphService.getGraph().removeNode(productType);
  }, [dispatch]);

  const handleRemoveCard = useCallback(() => {
    removeProduct(id, handleRemoveProduct);
  }, [handleRemoveProduct, id, removeProduct]);

  const handleSelect = useCallback(() => {
    dispatch(workflowBuilderProductSelect(id));
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

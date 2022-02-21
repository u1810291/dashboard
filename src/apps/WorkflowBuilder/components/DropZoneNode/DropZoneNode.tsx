import { Box, Grid } from '@material-ui/core';
import { useProductAdding } from 'apps/Product/hooks/ProductAdding.hook';
import { FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY } from 'models/DragAndDrop.model';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { workflowBuilderProductAdd } from '../../store/WorkflowBuilder.action';
import { ReactFlowCustomHandler } from '../ReactFlowCustomHandler/ReactFlowCustomHandler';
import { useStyles } from './DropZoneNode.styles';

export function DropZoneNode() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const addProduct = useProductAdding();

  const handleAdd = useCallback((productType: ProductTypes) => {
    dispatch(workflowBuilderProductAdd(productType));
  }, [dispatch]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const productType: ProductTypes = event.dataTransfer.getData(FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY);

    addProduct(productType, handleAdd);
  }, [addProduct, handleAdd]);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.root} onDrop={handleDrop}>
      <Box color="common.black75" fontWeight="bold">
        {intl.formatMessage({ id: 'FlowBuilder.graph.dropZone' })}
      </Box>
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Grid>
  );
}

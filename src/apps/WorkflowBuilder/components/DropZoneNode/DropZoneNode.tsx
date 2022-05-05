import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useProductAdding } from 'apps/Product/hooks/ProductAdding.hook';
import { FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY } from 'models/DragAndDrop.model';
import { ProductTypes } from 'models/Product.model';
import React from 'react';
import { Position } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import { workflowBuilderProductAdd } from '../../store/WorkflowBuilder.action';
import { ReactFlowCustomHandler } from '../ReactFlowCustomHandler/ReactFlowCustomHandler';
import { useStyles } from './DropZoneNode.styles';

export function DropZoneNode() {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const addProduct = useProductAdding();

  const handleAdd = (productType: ProductTypes) => {
    dispatch(workflowBuilderProductAdd(productType));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const productType: ProductTypes = event.dataTransfer.getData(FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY);

    addProduct(productType, handleAdd);
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.root} onDrop={handleDrop}>
      <Box color="common.black75" fontWeight="bold">
        {formatMessage('FlowBuilder.graph.dropZone')}
      </Box>
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Grid>
  );
}

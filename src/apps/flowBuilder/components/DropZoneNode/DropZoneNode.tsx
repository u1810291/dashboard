import { Box, Grid } from '@material-ui/core';
import { ReactFlowCustomHandler } from 'apps/flowBuilder/components/ReactFlowCustomHandler/ReactFlowCustomHandler';
import { FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY } from 'models/DragAndDrop.model';
import { flowBuilderProductAdd } from 'apps/flowBuilder/store/FlowBuilder.action';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useStyles } from './DropZoneNode.styles';

export function DropZoneNode() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const productType = event.dataTransfer.getData(FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY);
    dispatch(flowBuilderProductAdd(productType));
  }, [dispatch]);

  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root} onDrop={handleDrop}>
      <Box color="common.black75" fontWeight="bold">
        {intl.formatMessage({ id: 'FlowBuilder.graph.dropZone' })}
      </Box>
      <ReactFlowCustomHandler type="target" position={Position.Top} />
      <ReactFlowCustomHandler type="source" position={Position.Bottom} />
    </Grid>
  );
}

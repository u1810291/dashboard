import { Box } from '@material-ui/core';
import { ReactFlowCustomHandler } from 'apps/flowBuilder/components/ReactFlowCustomHandler/ReactFlowCustomHandler';
import cn from 'classnames';
import { FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY } from 'models/DragAndDrop.model';
import { flowBuilderProductAdd } from 'apps/flowBuilder/store/FlowBuilder.action';
import { getIdentityStatusLabel, IdentityStatuses } from 'models/Status.model';
import React, { useCallback } from 'react';
import { Position } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useStyles } from './StatusNode.styles';

export interface StatusNodeProps {
  id: IdentityStatuses,
}

export function StatusNode({ id }: StatusNodeProps) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const productType = event.dataTransfer.getData(FLOW_BUILDER_DRAG_PRODUCT_DATA_TRANSFER_KEY);
    dispatch(flowBuilderProductAdd(productType));
  }, [dispatch]);

  return (
    <Box className={cn(classes.node, classes[id])} onDrop={handleDrop}>
      <Box>{intl.formatMessage({ id: getIdentityStatusLabel(id) })}</Box>
      <ReactFlowCustomHandler type="target" position={Position.Top} />
    </Box>
  );
}

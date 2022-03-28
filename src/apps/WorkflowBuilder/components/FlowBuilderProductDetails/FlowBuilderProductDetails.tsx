import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { ProductSettings } from 'apps/Product/components/ProductSettings/ProductSettings';
import { IWorkflow } from 'models/Workflow.model';
import { useFormatMessage } from 'apps/intl';
import { DeepPartial } from 'lib/object';
import { workflowBuilderProductSelect } from '../../store/WorkflowBuilder.action';
import { useStyles } from './FlowBuilderProductDetails.styles';

export function FlowBuilderProductDetails({ flow, productId, onUpdate }: {
  flow: IWorkflow;
  productId: ProductTypes;
  onUpdate: (patch: DeepPartial<IWorkflow>) => void;
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();

  const handleClose = useCallback(() => {
    dispatch(workflowBuilderProductSelect(null));
  }, [dispatch]);

  return (
    <Box p={0.4} className={classes.root}>
      <Box p={1.6} className={classes.container}>
        <Box mb={2} className={classes.wrapper}>
          <IconButton className={classes.buttonClose} onClick={handleClose} type="button">
            <FiX size={20} />
          </IconButton>
          <Box fontWeight="bold" color="common.black90">
            {formatMessage('FlowBuilder.productSettings')}
          </Box>
        </Box>
        <Box>
          <ProductSettings<IWorkflow>
            flow={flow}
            productId={productId}
            onUpdate={onUpdate}
          />
        </Box>
      </Box>
    </Box>
  );
}

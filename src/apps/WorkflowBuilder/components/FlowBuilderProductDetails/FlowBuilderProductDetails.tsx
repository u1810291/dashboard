import { Box, IconButton } from '@material-ui/core';
import { IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { ProductSettings } from 'apps/Product/components/ProductSettings/ProductSettings';
import { workflowBuilderProductSelect } from '../../store/WorkflowBuilder.action';
import { useStyles } from './FlowBuilderProductDetails.styles';

export function FlowBuilderProductDetails({ flow, productId, onUpdate }: {
  flow: IFlow;
  productId: ProductTypes;
  onUpdate: (patch: Partial<IFlow>) => void;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();

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
            {intl.formatMessage({ id: 'FlowBuilder.productSettings' })}
          </Box>
        </Box>
        <Box>
          <ProductSettings
            flow={flow}
            productId={productId}
            onUpdate={onUpdate}
          />
        </Box>
      </Box>
    </Box>
  );
}

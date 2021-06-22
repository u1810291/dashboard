import { Box } from '@material-ui/core';
import { IFlow } from 'models/Flow.model';
import { ProductTypes } from 'models/Product.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ProductSettings } from '../../../Product/components/ProductSettings/ProductSettings';
import { flowBuilderProductSelect } from '../../store/FlowBuilder.action';
import { useStyles } from './FlowBuilderProductDetails.styles';

export function FlowBuilderProductDetails({ flow, productId, onUpdate }: {
  flow: IFlow;
  productId: ProductTypes;
  onUpdate: Function;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(flowBuilderProductSelect(null));
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Box p={2} fontWeight="bold" color="common.black90">
        <Box>
          {intl.formatMessage({ id: 'FlowBuilder.productSettings' })}
        </Box>
        <Box>
          <button onClick={handleClose} type="button">close</button>
        </Box>
      </Box>
      <Box p={1}>
        <ProductSettings
          flow={flow}
          productId={productId}
          onUpdate={onUpdate}
        />
      </Box>
    </Box>
  );
}

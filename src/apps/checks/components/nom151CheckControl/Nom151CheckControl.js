import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { notification } from 'apps/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectNom151Check, selectMerchantFlowsModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { PageLoader } from 'apps/layout';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import { useStyles } from './Nom151CheckControl.styles';

export function Nom151CheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const nom151Check = useSelector(selectNom151Check);
  const flowModel = useSelector(selectMerchantFlowsModel);
  const flowId = useSelector(selectCurrentFlowId);
  const [state, setState] = useState(false);

  const handleChange = useCallback(async (event) => {
    const isChecked = event.target.checked;
    try {
      await dispatch(merchantUpdateFlow(flowId, {
        digitalSignature: isChecked ? DigitalSignatureProvider.NOM151 : DigitalSignatureProvider.NONE,
      }));
      setState(isChecked);
    } catch {
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: intl.formatMessage({ id: 'Product.checks.nom151Check.title' }) }));
    }
  }, [dispatch, intl, flowId]);

  useEffect(() => {
    setState(nom151Check !== DigitalSignatureProvider.NONE);
  }, [nom151Check]);

  return (
    <FormControlLabel
      control={(
        <Switch
          name="nom151Check"
          color="primary"
          size="small"
          checked={state}
          onChange={handleChange}
          className={classes.switcher}
        />
      )}
      label={(
        <Box fontSize={12}>
          <Box display="flex">
            <Box>
              {intl.formatMessage({ id: 'Product.checks.nom151Check.switchLabel' })}
            </Box>
            <Box ml={1}>
              {' '}
              {flowModel.isLoading
                ? <PageLoader size={12} />
                : intl.formatMessage({ id: state ? 'on' : 'off' })}
            </Box>
          </Box>
        </Box>
)}
      labelPlacement="start"
      className={classes.container}
    />
  );
}

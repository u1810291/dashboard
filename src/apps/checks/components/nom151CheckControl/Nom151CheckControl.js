import { Switch } from '@material-ui/core';
import { notification } from 'apps/ui';
import { DigitalSignatureProvider } from 'models/DigitalSignature.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectNom151Check } from 'state/merchant/merchant.selectors';
import { useStyles } from './Nom151CheckControl.styles';

export function Nom151CheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const nom151Check = useSelector(selectNom151Check);
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
    <Switch
      name="nom151Check"
      color="primary"
      size="small"
      checked={state}
      onChange={handleChange}
      className={classes.switcher}
    />
  );
}

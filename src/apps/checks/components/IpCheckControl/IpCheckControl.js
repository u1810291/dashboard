import { Switch } from '@material-ui/core';
import { notification } from 'apps/ui';
import { VerificationPatternTypes } from 'models/Step.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectIpCheck } from 'state/merchant/merchant.selectors';
import { useStyles } from './IpCheckControl.styles';

export function IpCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ipCheck = useSelector(selectIpCheck);
  const [state, setState] = useState(false);

  const handleChange = useCallback(async (event) => {
    const value = event.target.checked;
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.IpValidation]: value,
        },
      }));
      setState(value);
    } catch (e) {
      // eslint-disable-next-line
      console.error('error', e.message)
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: 'IP CHECK' }));
    }
  }, [dispatch, intl]);

  useEffect(() => {
    setState(ipCheck);
  }, [ipCheck]);

  return (
    <Switch
      name="ipCheck"
      color="primary"
      size="small"
      checked={state}
      onChange={handleChange}
      className={classes.switcher}
    />
  );
}

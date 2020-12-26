import { Switch } from '@material-ui/core';
import { notification } from 'apps/ui';
import { VerificationStepTypes } from 'models/Identity.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectIpCheck } from 'state/merchant/merchant.selectors';
import { useStyles } from './IpCheckControl.styles';

export function IpCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ipCheck = useSelector(selectIpCheck);
  const [value, setValue] = useState(false);

  const handleChange = useCallback(async (event) => {
    const newValue = event.target.checked;
    try {
      await dispatch(configurationFlowUpdate({
        verificationPatterns: {
          [VerificationStepTypes.IpValidation]: newValue,
        },
      }));
      setValue(newValue);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: 'IP CHECK' }));
    }
  }, [dispatch, intl]);

  useEffect(() => {
    setValue(ipCheck);
  }, [ipCheck]);

  return (
    <Switch
      name="ipCheck"
      color="primary"
      size="small"
      checked={value}
      onChange={handleChange}
      className={classes.switcher}
    />
  );
}

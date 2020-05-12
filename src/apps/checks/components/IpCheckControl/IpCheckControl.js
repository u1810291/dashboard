import React, { useState, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'components/notification';
import { FormControlLabel, Switch, Box, CircularProgress } from '@material-ui/core';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectIpCheck, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { useStyles } from './IpCheckControl.styles';

export function IpCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ipCheck = useSelector(selectIpCheck);
  const flowModel = useSelector(selectMerchantFlowsModel);
  const [state, setState] = useState(false);

  const switchLabel = useCallback(() => {
    const st = flowModel.isLoading
      ? (<CircularProgress size={12} />)
      : intl.formatMessage({ id: state ? 'on' : 'off' });

    return intl.formatMessage(
      { id: 'Product.checks.ipCheck.switchLabel' },
      { state: st },
    );
  }, [flowModel.isLoading, intl, state]);

  const handleChange = useCallback((event) => {
    const target = event.target.checked;
    const oldState = state;
    dispatch(configurationFlowUpdate({ verificationPatterns: { 'ip-validation': target } }))
      .catch(() => {
        setState(oldState);
        notification.error(intl.formatMessage({ id: 'update.field.error' }, { name: 'IP CHECK' }));
      });
    setState(target);
  }, [dispatch, intl, state]);

  useEffect(() => {
    setState(ipCheck);
  }, [ipCheck]);

  return (
    <FormControlLabel
      control={(
        <Switch
          name="ipCheck"
          color="primary"
          size="small"
          checked={state}
          onChange={handleChange}
          className={classes.switcher}
        />
      )}
      label={<Box fontSize={12}>{switchLabel}</Box>}
      labelPlacement="start"
      className={classes.container}
    />
  );
}

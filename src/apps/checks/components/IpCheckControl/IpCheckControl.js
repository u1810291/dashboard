import { Box, FormControlLabel, Switch } from '@material-ui/core';
import { notification } from 'components/notification';
import { VerificationStepTypes } from 'models/Identity.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import { selectIpCheck, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { PageLoader } from 'apps/layout';
import { useStyles } from './IpCheckControl.styles';

export function IpCheckControl() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const ipCheck = useSelector(selectIpCheck);
  const flowModel = useSelector(selectMerchantFlowsModel);
  const [state, setState] = useState(false);

  const switchLabel = useCallback(() => (
    <Box display="flex">
      <Box>
        {intl.formatMessage({ id: 'Product.checks.ipCheck.switchLabel' })}
      </Box>
      <Box ml={1}>
        {' '}
        {flowModel.isLoading
          ? <PageLoader size={12} />
          : intl.formatMessage({ id: state ? 'on' : 'off' })}
      </Box>
    </Box>
  ), [flowModel.isLoading, intl, state]);

  const handleChange = useCallback((event) => {
    const target = event.target.checked;
    const oldState = state;
    dispatch(configurationFlowUpdate({
      verificationPatterns: {
        [VerificationStepTypes.IpValidation]: target,
      },
    }))
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

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Items } from 'components';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectVerificationPattern } from 'state/merchant/merchant.selectors';
import useStyles from './BiometricStep.styles';

export function BiometricStep() {
  const intl = useIntl();
  const options = [
    {
      label: intl.formatMessage({ id: 'flow.biometricStep.none' }),
      value: 'none',
    },
    {
      label: intl.formatMessage({ id: 'flow.biometricStep.selfie' }),
      value: 'selfie',
    },
    {
      label: intl.formatMessage({ id: 'flow.biometricStep.liveness' }),
      value: 'liveness',
    },
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const patterns = useSelector(selectVerificationPattern);
  const flowId = useSelector(selectCurrentFlowId);
  const defaultState = get(options.find((option) => option.value === patterns.biometrics), 'value', 'none');
  const [value, setValue] = useState(defaultState);

  const handleChange = useCallback((event) => {
    const targetValue = event.target.value;
    setValue(targetValue);
    dispatch(merchantUpdateFlow(flowId, { verificationPatterns: { biometrics: targetValue } }));
  }, [dispatch, flowId]);

  useEffect(() => {
    const biometrics = patterns.biometrics || 'none';
    setValue(biometrics);
  }, [patterns.biometrics]);

  return (
    <FormControl component="fieldset">
      <Items flow="row">
        <Typography variant="h5">
          {intl.formatMessage({ id: 'flow.documentTypeStep.biometric.title' })}
        </Typography>
        <Box>
          {intl.formatMessage({ id: 'flow.documentTypeStep.biometric.subtitle' })}
        </Box>
        <RadioGroup
          aria-label="biometric-step"
          name="biometric-steps"
          value={value}
          onChange={handleChange}
        >
          { options.map((item) => (
            <FormControlLabel
              key={item.label}
              value={item.value}
              control={<Radio color="default" />}
              className={classes.formLabel}
              label={item.label}
            />
          ))}
        </RadioGroup>
      </Items>
    </FormControl>
  );
}

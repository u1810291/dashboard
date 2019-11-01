import { get } from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { Items } from 'components';
import useStyles from './styles';

const BiometricStep = ({
  patterns = {},
  onChange,
}) => {
  const intl = useIntl();
  const classes = useStyles();
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
  const defaultState = get(options.find((option) => option.value === patterns.biometrics), 'value', 'none');
  const [value, setValue] = useState(defaultState);
  const handleChange = (event) => {
    const targetValue = event.target.value;
    setValue(targetValue);
    onChange({
      verificationPatterns: { ...patterns, biometrics: targetValue },
    });
  };

  return (
    <FormControl component="fieldset">
      <Items flow="row">
        <Typography variant="h3">
          {intl.formatMessage({ id: 'flow.documentTypeStep.biometric.title' })}
        </Typography>
        <Box>
          {intl.formatMessage({ id: 'flow.documentTypeStep.biometric.subtitle' })}
        </Box>
        <RadioGroup
          defaultValue={value}
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
};

export default BiometricStep;

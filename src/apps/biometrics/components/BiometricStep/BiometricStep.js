import { Box, Grid, RadioGroup, Switch, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import { BoxBordered, Warning, WarningSize, WarningTypes } from 'apps/ui';
import { BiometricSettings, BiometricTypes, getBiometricParentSetting } from 'models/Biometric.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectBiometricPattern, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { FormControlLabelFixed, RadioFixed, useStyles } from './BiometricStep.styles';
import LivenessVoiceSVG from './liveness-voice-video.svg';

const OptionsImageMap = {
  [BiometricTypes.voiceLiveness]: LivenessVoiceSVG,
};

export function BiometricStep() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();
  const pattern = useSelector(selectBiometricPattern);
  const flowId = useSelector(selectCurrentFlowId);
  const [setting, setSetting] = useState(pattern);
  // enabled options
  const [options, setOptions] = useState([]);

  const handleSettingChange = useCallback((value) => {
    setSetting(value);
    setOptions([]);
  }, []);

  useEffect(() => {
    if (!pattern) {
      return;
    }
    const foundParent = BiometricSettings.find((item) => item.id === pattern);
    if (foundParent) {
      handleSettingChange(foundParent.id);
    } else {
      // enable both parent and option
      const parent = getBiometricParentSetting(pattern);
      handleSettingChange(parent.id);
      setOptions((prev) => [
        ...prev,
        pattern,
      ]);
    }
  }, [pattern, handleSettingChange]);

  const handleSave = useCallback((value) => {
    dispatch(merchantUpdateFlow(flowId, {
      verificationPatterns: {
        biometrics: value,
      },
    }));
  }, [dispatch, flowId]);

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    handleSettingChange(value);
    handleSave(value);
  }, [handleSave, handleSettingChange]);

  const handleOptionChange = useCallback((parentId, optionId, e) => {
    if (e.target.checked) {
      setOptions((prev) => [
        ...prev,
        optionId,
      ]);
      handleSave(optionId);
    } else {
      setOptions((prev) => prev.filter((item) => item !== optionId));
      handleSave(parentId);
    }
  }, [handleSave]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'BiometricStep.title' })}
      </Typography>

      <Box mb={3}>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'BiometricStep.description' })}
        </Typography>
      </Box>

      <RadioGroup
        aria-label="biometric-step"
        name="biometric-steps"
        value={setting}
        onChange={handleChange}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {intl.formatMessage({ id: 'BiometricStep.subtitle' })}
            </Typography>
          </Grid>

          {BiometricSettings.map((item) => {
            const description = intl.formatMessage({ id: `BiometricStep.${item.id}.description`, defaultMessage: ' ' });

            return (
              <Grid item key={item.id}>
                <BoxBordered>
                  <FormControlLabelFixed
                    value={item.id}
                    control={<RadioFixed color="default" />}
                    label={(
                      <Box>
                        <Typography variant="h5">
                          {intl.formatMessage({ id: `BiometricStep.${item.id}.title` })}
                        </Typography>
                        {description !== ' ' && (
                          <Box mt={0.5} color="textSecondary">
                            <Typography variant="body1" color="textSecondary">
                              {intl.formatMessage({ id: `BiometricStep.${item.id}.description`, defaultMessage: '' })}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  />
                  {setting === item.id && item.options && (
                    <Box mt={2} ml={3}>
                      <Typography variant="h5">
                        {intl.formatMessage({ id: 'BiometricStep.additionalSettings' })}
                      </Typography>
                      {item.options.map((option) => (
                        <BoxBordered key={option.id} mt={1}>
                          <Box>
                            <FormControlLabelFixed
                              control={(
                                <Switch
                                  color="primary"
                                  checked={options.includes(option.id)}
                                  onClick={(e) => handleOptionChange(item.id, option.id, e)}
                                />
                              )}
                              label={(
                                <Box display="flex">
                                  <Box mr={2}>
                                    <Typography variant="h5" gutterBottom>
                                      {intl.formatMessage({ id: `BiometricStep.${item.id}.${option.id}.title` })}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                      {intl.formatMessage({ id: `BiometricStep.${item.id}.${option.id}.description` })}
                                    </Typography>
                                  </Box>
                                  <img className={classes.optionImage} src={OptionsImageMap[option.id]} alt="" />
                                </Box>
                              )}
                            />
                          </Box>
                          {option.id === BiometricTypes.voiceLiveness && (
                            <BoxBordered borderColor={appPalette.red} mt={1}>
                              <Warning
                                type={WarningTypes.ImportantWarning}
                                size={WarningSize.Large}
                                label={intl.formatMessage({ id: `BiometricStep.${item.id}.${option.id}.warning` })}
                                isLabelColored
                              />
                            </BoxBordered>
                          )}
                        </BoxBordered>
                      ))}
                    </Box>
                  )}
                </BoxBordered>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </Box>
  );
}
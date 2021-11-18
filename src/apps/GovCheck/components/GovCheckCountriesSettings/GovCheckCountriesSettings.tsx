import { Box, FormControl, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { GovCheck, GovCheckConfigurations, govCheckCountriesOrder, govCheckParse, GovCheckTypesForStep } from 'apps/GovCheck/models/GovCheck.model';
import { flagMap } from 'assets/flags';
import { VerificationPatterns, VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { ExtendedDescription } from 'apps/ui';
import { BiometricTypes } from 'models/Biometric.model';
import { useStyles } from './GovCheckCountriesSettings.styles';

export function GovCheckCountriesSettings({ verificationPattern, onChange }: {
     verificationPattern: Partial<VerificationPatterns>;
     onChange: (value: Partial<VerificationPatterns>) => void;
  }) {
  const intl = useIntl();
  const classes = useStyles();

  const checkListForCountry = useCallback((country: string) => {
    const found = GovCheckConfigurations.find((item) => item.country === country);
    if (!found) {
      return null;
    }

    return govCheckParse(found.checks, verificationPattern);
  }, [verificationPattern]);

  const handleSwitch = useCallback((item: GovCheck) => (event) => {
    let value;
    if (item.stepTypeAlias) {
      value = event.target.checked ? item.stepTypeAlias : GovCheckTypesForStep[item.id].none;
    }

    onChange({ [item.id]: value || event.target.checked });
  }, [onChange]);

  const handleSwitchOption = useCallback((item: GovCheck) => (event) => {
    onChange({ [item.id]: event.target.checked ? item.option?.stepTypeAlias : item.stepTypeAlias });
  }, [onChange]);

  return (
    <FormControl className={classes.control}>
      {govCheckCountriesOrder.map((country) => (
        <Box key={country} className={classes.wrapper} p={1} pr={2} mt={1}>
          <Grid container alignItems="center" wrap="nowrap">
            <Box mr={1} className={classes.icon}>{flagMap[country]}</Box>
            <Box color="common.black90" fontWeight="bold">
              {intl.formatMessage({ id: `GovCheck.country.${country}` })}
            </Box>
          </Grid>
          {checkListForCountry(country).map((govCheck) => (
            <Box key={govCheck.id} mt={1} className={classes.check}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={!!govCheck.value}
                    onChange={handleSwitch(govCheck)}
                    color="primary"
                  />
                  )}
                label={(
                  <Box color="common.black75" fontWeight="bold">
                    {intl.formatMessage({ id: `GovCheck.check.${govCheck.id}` })}
                  </Box>
                )}
              />
              {govCheck.option && (
                <Box display="flex" mt={0.3}>
                  <Box className={classes.arrow} />
                  <Box ml={0.5}>
                    <ExtendedDescription
                      title={intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}` })}
                      titleColor="common.black75"
                      text={intl.formatMessage({ id: `GovCheck.check.${govCheck.id}.${govCheck.option.id}.description` })}
                      textFontSize={10}
                      postfix={(
                        <Switch
                          checked={!!govCheck.option.value}
                          onChange={handleSwitchOption(govCheck)}
                          color="primary"
                          disabled={!govCheck.value || (!govCheck.option.value && verificationPattern[VerificationPatternTypes.Biometrics] !== BiometricTypes.selfie)}
                        />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </FormControl>
  );
}

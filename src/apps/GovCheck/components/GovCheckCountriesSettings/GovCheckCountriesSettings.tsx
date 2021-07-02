import React, { useCallback } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { GovCheck, GovCheckConfigurations, govCheckCountriesOrder, govCheckParse, GovCheckTypesForStep } from 'apps/GovCheck/models/GovCheck.model';
import { useIntl } from 'react-intl';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { flags } from '../../assets/flags';
import { useStyles } from './GovCheckCountriesSettings.styles';

export function GovCheckCountriesSettings({ verificationPattern, onChange }: {
     verificationPattern: Partial<VerificationPatterns>,
     onChange: (value: Partial<VerificationPatterns>) => void
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

  return (
    <FormControl className={classes.control}>
      {govCheckCountriesOrder.map((country) => (
        <Box key={country} className={classes.wrapper} p={1} pr={2} mt={1}>
          <Grid container alignItems="center" wrap="nowrap">
            <Box mr={1} className={classes.icon}>{flags[country]}</Box>
            <Box color="common.black90" fontWeight="bold">
              {intl.formatMessage({ id: `GovCheck.country.${country}` })}
            </Box>
          </Grid>
          {checkListForCountry(country).map((checkbox) => (
            <Box key={checkbox.id} mt={1} className={classes.check}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={!!checkbox.value}
                    onChange={handleSwitch(checkbox)}
                    color="primary"
                  />
                  )}
                label={(
                  <Box color="common.black75" fontWeight="bold">
                    {intl.formatMessage({ id: `GovCheck.check.${checkbox.id}` })}
                  </Box>
                )}
              />
            </Box>
          ))}
        </Box>
      ))}
    </FormControl>
  );
}

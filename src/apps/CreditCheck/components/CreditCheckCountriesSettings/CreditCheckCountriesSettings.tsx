import React, { useCallback } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { CreditCheck, CreditCheckConfigurations, creditCheckCountriesOrder, creditCheckParse } from 'apps/CreditCheck/models/CreditCheck.model';
import { useIntl } from 'react-intl';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { codedFlagMap } from 'assets/flags';
import { useStyles } from './CreditCheckCountriesSettings.styles';

export function CreditCheckCountriesSettings({ verificationPattern, onChange }: {
     verificationPattern: Partial<VerificationPatterns>;
     onChange: (value: Partial<VerificationPatterns>) => void;
  }) {
  const intl = useIntl();
  const classes = useStyles();

  const checkListForCountry = useCallback((country: string) => {
    const found = CreditCheckConfigurations.find((item) => item.country === country);
    if (!found) {
      return null;
    }

    return creditCheckParse(found.checks, verificationPattern);
  }, [verificationPattern]);

  const handleSwitch = useCallback((item: CreditCheck) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [item.id]: event.target.checked });
  }, [onChange]);

  return (
    <FormControl className={classes.control}>
      {creditCheckCountriesOrder.map((country) => (
        <Box key={country} className={classes.wrapper} p={1} pr={2} mt={1}>
          <Grid container alignItems="center" wrap="nowrap">
            <Box mr={1} className={classes.icon}>{codedFlagMap[country]}</Box>
            <Box color="common.black90" fontWeight="bold">
              {intl.formatMessage({ id: `Countries.${country}` })}
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
                    {intl.formatMessage({ id: `CreditCheck.check.${checkbox.id}` })}
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

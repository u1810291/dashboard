/* eslint-disable consistent-return */
import React, { useMemo, useCallback } from 'react';
import { Box, FormControl, Grid, Switch } from '@material-ui/core';
import { IBackgroundCheck, backgroundCheckConfigurations, backgroundCheckCountriesOrder, backgroundCheckParse } from 'models/BackgroundCheck.model';
import { useIntl } from 'react-intl';
import { VerificationPatterns } from 'models/VerificationPatterns.model';
import { flagMap } from 'assets/flags';
import { ExtendedDescription } from 'apps/ui';
import { useStyles } from './BackgroundCheckCountriesSettings.styles';

export function BackgroundCheckCountriesSettings({ verificationPattern, onChange }: {
  verificationPattern: Partial<VerificationPatterns>;
  onChange: (value: Partial<VerificationPatterns>) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();

  const checkList = useMemo(() => {
    const checkListForCountry = (country: string) => {
      const found = backgroundCheckConfigurations.find((item) => item.country === country);
      if (!found) {
        return null;
      }

      return backgroundCheckParse(found.checks, verificationPattern);
    };

    return backgroundCheckCountriesOrder.map((country) => ({
      country,
      toggle: checkListForCountry(country),
    }));
  }, [verificationPattern]);

  const handleSwitch = useCallback((item: IBackgroundCheck) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [item.id]: event.target.checked });
  }, [onChange]);
  const handleSwitch2 = useCallback((item: IBackgroundCheck, value: String) => {
    onChange({ [item.id]: item.value === value ? item.default : value });
  }, [onChange]);

  return (
    <FormControl className={classes.control}>
      {checkList.map((item) => {
        const { country, toggle } = item;
        return (
          <Box key={country} className={classes.wrapper} p={2.4} pr={1} pl={1} mt={1}>
            <Grid container alignItems="center" wrap="nowrap" className={classes.title}>
              <Box mr={1} className={classes.icon}>{flagMap[country]}</Box>
              <Box color="common.black90" fontWeight="bold">
                {intl.formatMessage({ id: `Countries.${country}` })}
              </Box>
            </Grid>
            {toggle.map((checkbox) => (checkbox.options.doubly ? (
              <Box key={checkbox.id} className={classes.extendedDescription}>
                {checkbox.options.list.map(({ title, value }) => (
                  <ExtendedDescription
                    title={title}
                    titleColor="common.black75"
                    textFontSize={10}
                    postfix={(
                      <Switch
                        checked={value === checkbox.value}
                        onClick={() => handleSwitch2(checkbox, value)}
                        color="primary"
                      />
                    )}
                  />
                ))}
              </Box>
            ) : (
              <Box key={checkbox.id} className={classes.check}>
                <Switch
                  checked={!!checkbox.value}
                  onChange={handleSwitch(checkbox)}
                  color="primary"
                />
              </Box>
            )))}
          </Box>
        );
      })}
    </FormControl>
  );
}

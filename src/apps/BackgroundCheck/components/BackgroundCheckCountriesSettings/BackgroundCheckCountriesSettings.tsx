/* eslint-disable consistent-return */
import React, { useMemo, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { IBackgroundCheck, backgroundCheckConfigurations, backgroundCheckCountriesOrder, backgroundCheckParse } from 'models/BackgroundCheck.model';
import { useIntl } from 'react-intl';
import { IVerificationPatterns } from 'models/VerificationPatterns.model';
import { flagMap } from 'assets/flags';
import { ExtendedDescription } from 'apps/ui';
import { useStyles } from './BackgroundCheckCountriesSettings.styles';

export function BackgroundCheckCountriesSettings({ verificationPattern, onChange }: {
  verificationPattern: Partial<IVerificationPatterns>;
  onChange: (value: Partial<IVerificationPatterns>) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();

  const countryCheckList = useMemo(() => {
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
  const handleExtendedDescriptionSwitch = useCallback((item: IBackgroundCheck, value: String) => {
    onChange({ [item.id]: item.value === value ? item.default : value });
  }, [onChange]);

  return (
    <FormControl className={classes.control}>
      {countryCheckList.map((item) => {
        const { country, toggle: countryToggle } = item;
        return (
          <Box key={country} className={classes.wrapper} p={2.4} pr={1} pl={1} mt={1}>
            <Grid container alignItems="center" wrap="nowrap" className={classes.title}>
              <Box mr={1} className={classes.icon}>{flagMap[country]}</Box>
              <Box color="common.black90" fontWeight="bold">
                {intl.formatMessage({ id: `Countries.${country}` })}
              </Box>
            </Grid>
            {countryToggle.map((toggle) => (toggle.options?.list?.length ? (
              <Box key={toggle.id} className={classes.extendedDescription}>
                {toggle.options.list.map((checks: { id: string; title: string; value: string }) => (
                  <ExtendedDescription
                    key={checks.id}
                    title={checks.title}
                    titleColor="common.black75"
                    textFontSize={10}
                    postfix={(
                      <Switch
                        checked={checks.value === toggle.value}
                        onClick={() => handleExtendedDescriptionSwitch(toggle, checks.value)}
                        color="primary"
                      />
                    )}
                  />
                ))}
              </Box>
            ) : (
              <Box key={toggle.id} className={classes.check}>
                <Switch
                  checked={!!toggle.value}
                  onChange={handleSwitch(toggle)}
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

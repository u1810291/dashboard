import { Grid, Box, Switch } from '@material-ui/core';
import { codedFlagMap } from 'assets/flags';
import { CountryCodes } from 'models/Country.model';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CountrySwitch.styles';

export function CountrySwitch({
  country,
  value,
  onChange,
}: {
  country: CountryCodes;
  value: boolean;
  onChange?: (value: boolean) => void;
}) {
  const classes = useStyles();
  const intl = useIntl();

  const handleChange = useCallback(({ target: { checked } }) => {
    if (onChange) {
      onChange(checked);
    }
  }, [onChange]);

  return (
    <Box className={classes.wrapper} p={1} pr={2} mt={1}>
      <Grid container alignItems="center" wrap="nowrap" justify="space-between">
        <Grid container item alignItems="center">
          <Box mr={1} className={classes.icon}>
            {codedFlagMap[country]}
          </Box>
          <Box color="common.black90" fontWeight="bold">
            {intl.formatMessage({ id: `Countries.${country}` })}
          </Box>
        </Grid>
        <Grid item>
          <Switch
            inputProps={{ 'data-qa': QATags.Flows.CountrySwitch } as any}
            checked={value}
            onChange={handleChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

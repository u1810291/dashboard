import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCountriesOnlyExisting } from 'state/countries/countries.selectors';
import { ReactComponent as CheckboxOff } from '../../../../assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from '../../../../assets/icon-checkbox-on.svg';
import { useStyles } from './ByCountries.styles';

export function ByCountries({ bufferedFilter: { countries }, onHandleFilterChange }) {
  const classes = useStyles();
  const intl = useIntl();
  const countriesList = useSelector(selectCountriesOnlyExisting);
  const handleSelectCountry = useCallback(({ target: { value } }) => {
    const newCountries = [...countries];

    if (newCountries.includes(value)) {
      const filtered = newCountries.filter((item) => item !== value);
      onHandleFilterChange({ countries: filtered });
      return;
    }

    newCountries.push(value);
    onHandleFilterChange({ countries: newCountries });
  }, [countries, onHandleFilterChange]);

  const checkIsSelected = useCallback((id) => countries?.includes(id), [countries]);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiCheckCircle />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.countries.title' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.status}>
        {!LoadableAdapter.isPristine(countriesList) && countriesList.value.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            checked={checkIsSelected(item.id)}
            control={<Checkbox onChange={handleSelectCountry} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
            label={intl.formatMessage({ id: `Countries.${item.id}` })}
          />
        ))}
      </Paper>
    </Grid>
  );
}

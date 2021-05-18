import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { useFilterCheckbox } from 'apps/filter/hooks/filterBy.hook';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { analyticsFilterStructure } from 'models/Analytics.model';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCountriesOnlyExisting } from 'state/countries/countries.selectors';
import { ReactComponent as CheckboxOff } from '../../../../assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from '../../../../assets/icon-checkbox-on.svg';
import { useStyles } from './ByCountries.styles';

export function ByCountries({ bufferedFilter: { countries }, onFilterChange }) {
  const classes = useStyles();
  const intl = useIntl();
  const [handleSelectCountry, checkIsSelected] = useFilterCheckbox(analyticsFilterStructure.countries, countries, onFilterChange);
  const countriesList = useSelector(selectCountriesOnlyExisting);

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

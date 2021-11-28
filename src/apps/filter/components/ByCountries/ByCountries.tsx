import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { useFilterCheckbox } from 'apps/filter/hooks/filterBy.hook';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { analyticsFilterStructure } from 'models/Analytics.model';
import { FilterI } from 'models/Filter.model';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAllCountriesModel, selectCountriesList } from 'state/countries/countries.selectors';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { useStyles } from './ByCountries.styles';

export function ByCountries({ bufferedFilter: { countries }, onFilterChange }: {
  bufferedFilter?: Partial<FilterI>;
  onFilterChange?: (filter: FilterI) => void;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const [handleSelectCountry, checkIsSelected] = useFilterCheckbox(analyticsFilterStructure.countries, countries, onFilterChange);
  const countriesList = useSelector(selectCountriesList);
  const allCountriesModel = useSelector(selectAllCountriesModel);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiCheckCircle />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.countries.title' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.status}>
        {!LoadableAdapter.isPristine(allCountriesModel) && countriesList.map((item) => (
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

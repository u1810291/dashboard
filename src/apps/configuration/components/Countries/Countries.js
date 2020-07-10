import { Box, CircularProgress, Typography, Button, Chip, Grid } from '@material-ui/core';
import { closeOverlay, createOverlay } from 'components/overlay';
import React from 'react';
import { useIntl } from 'react-intl';
import { Warning } from 'apps/ui';
import { CountriesModal } from '../CountriesModal/CountriesModal';

export function Countries({ countries, supportedCountries = [], onSubmit, isLoading }) {
  const intl = useIntl();

  const onSubmitHandler = (value) => {
    closeOverlay();
    onSubmit({ supportedCountries: value.map((item) => item.value) });
  };

  const mapCountries = (item) => ({
    value: item.code,
    label: item.name,
  });

  const mapValues = (item) => {
    const country = countries.find(({ code }) => code === item);
    return {
      value: item,
      label: country && country.name,
    };
  };

  const openCountriesModal = () => createOverlay(
    <CountriesModal
      onSubmit={onSubmitHandler}
      supportedCountries={supportedCountries.map(mapValues)}
      countries={countries.map(mapCountries)}
    />,
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.countries.title' })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: 'flow.countries.description' })}
      </Typography>

      <Box my={1}>
        <Warning label={intl.formatMessage({ id: 'flow.countries.warning' })} />
      </Box>

      {!!supportedCountries.length && (
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'flow.countries.verifying' })}
        </Typography>
      )}

      {/* content */}
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Box>
          {supportedCountries.length > 0 && (
            <Grid container spacing={1} direction="row">
              {supportedCountries
                .map(mapValues)
                .map((country) => (
                  <Grid item key={country.value}>
                    <Chip label={country.label} color="default" />
                  </Grid>
                ))}
            </Grid>
          )}

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={openCountriesModal}
            >
              {intl.formatMessage({
                id: supportedCountries.length > 0
                  ? 'flow.countries.edit'
                  : 'flow.countries.add',
              })}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

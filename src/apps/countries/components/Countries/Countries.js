import { Box, Button, Chip, Grid, Typography } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { Warning, WarningSize, WarningTypes } from 'apps/ui';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAllCountriesModel } from 'state/countries/countries.selectors';
import { selectSupportedCountries } from 'state/merchant/merchant.selectors';
import { CountriesModal } from '../CountriesModal/CountriesModal';

export function Countries({ onSubmit }) {
  const intl = useIntl();
  const countriesModel = useSelector(selectAllCountriesModel);
  const supportedCountries = useSelector(selectSupportedCountries);
  const [createOverlay, closeOverlay] = useOverlay();

  const handleSubmit = useCallback((value) => {
    closeOverlay();
    onSubmit({
      supportedCountries: (value || []).map((item) => item.value),
    });
  }, [closeOverlay, onSubmit]);

  const mapCountries = useCallback((item) => ({
    value: item.code,
    label: item.name,
  }), []);

  const mapValues = useCallback((item) => {
    const country = countriesModel.value.find(({ code }) => code === item);
    return {
      value: item,
      label: country?.name,
    };
  }, [countriesModel]);

  const openCountriesModal = useCallback(() => {
    createOverlay(
      <CountriesModal
        onSubmit={handleSubmit}
        supportedCountries={supportedCountries.map(mapValues)}
        countries={countriesModel.value.map(mapCountries)}
      />,
    );
  }, [createOverlay, handleSubmit, countriesModel, supportedCountries, mapValues, mapCountries]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.countries.title' })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: 'flow.countries.description' })}
      </Typography>

      <Box my={1}>
        <Warning
          type={WarningTypes.Warning}
          size={WarningSize.Large}
          label={intl.formatMessage({ id: 'flow.countries.warning' })}
        />
      </Box>

      {!!supportedCountries.length && (
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: 'flow.countries.verifying' })}
        </Typography>
      )}

      {/* content */}
      {countriesModel.isLoading
        ? <PageLoader />
        : (
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

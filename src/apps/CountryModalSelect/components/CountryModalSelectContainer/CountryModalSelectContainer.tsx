import { useCountriesLoad } from 'apps/countries';
import { Modal, useOverlay } from 'apps/overlay';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Spinner } from 'apps/ui';
import { AllowedRegions } from 'models/Country.model';
import { CountryModalSelect } from '../CountryModalSelect/CountryModalSelect';
import { useStyles } from './CountryModalSelectContainer.styles';

export function CountryModalSelectContainer({ onSubmit, initialValues, showRegions }: {
  onSubmit: (data: AllowedRegions[]) => void;
  initialValues: AllowedRegions[] | null;
  showRegions?: boolean;
}) {
  const countriesModel = useCountriesLoad();
  const countries = showRegions ? countriesModel.value : countriesModel.value.map((country) => ({ ...country, regions: [] }));
  const [, closeOverlay] = useOverlay();
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Modal
      onClose={closeOverlay}
      description={(
        <>
          <Typography variant="h4" gutterBottom className={classes.modalTitle}>
            {formatMessage('CountryModalSelect.title')}
          </Typography>
          <Box className={classes.modalSubTitle}>{formatMessage('CountryModalSelect.subtitle')}</Box>
        </>
    )}
      className={classes.modal}
    >
      {!countriesModel.isLoading && countriesModel.isLoaded
        ? (
          <CountryModalSelect
            initialValues={initialValues}
            countries={countries}
            onSubmit={onSubmit}
            onCancel={closeOverlay}
          />
        ) : (
          <Box height={340} display="flex" justifyContent="center" alignItems="center">
            <Spinner />
          </Box>
        )}
    </Modal>
  );
}

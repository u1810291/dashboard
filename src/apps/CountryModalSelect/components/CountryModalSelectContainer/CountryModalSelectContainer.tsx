import { useCountriesLoad } from 'apps/countries';
import { Modal, useOverlay } from 'apps/overlay';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'apps/ui';
import { useStyles } from './CountryModalSelectContainer.styles';

export function CountryModalSelectContainer({ children }) {
  const countriesModel = useCountriesLoad();
  const [, closeOverlay] = useOverlay();
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal
      onClose={closeOverlay}
      description={(
        <>
          <Typography variant="h4" gutterBottom className={classes.modalTitle}>
            {intl.formatMessage({ id: 'Product.configuration.ipCheck.selectValidCountry' })}
          </Typography>
          <Box className={classes.modalSubTitle}>{intl.formatMessage({ id: 'Product.configuration.ipCheck.selectValidCountry.subtitle' })}</Box>
        </>
    )}
      className={classes.modal}
    >
      {!countriesModel.isLoading && countriesModel.isLoaded
        ? children
        : (
          <Box height={340} display="flex" justifyContent="center" alignItems="center">
            <Spinner />
          </Box>
        )}
    </Modal>
  );
}

import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './GeographicalAreasControl.styles';

export function GeographicalAreasControl({ isCountriesControlOpen }, ref) {
  const intl = useIntl();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:960px)', { noSsr: true });

  return (
    <Box ref={ref}>
      {(isDesktop || !isCountriesControlOpen) && (
        <Box m={2} px={1} py={1.6} className={classes.geographicalAreas}>
          <Typography>
            {intl.formatMessage({ id: 'Map.geographicalAreas' })}
          </Typography>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'Map.verifications' })}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export const GeographicalAreasControlForward = React.forwardRef(GeographicalAreasControl);

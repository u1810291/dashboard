import { Box, Grid, Typography } from '@material-ui/core';
import { CheckResultLogo, SkeletonLoader } from 'apps/ui';
import classnames from 'classnames';
import { CustomWatchlistStep } from 'models/CustomWatchlist.model';
import { StepStatus } from 'models/Step.model';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { useStyles } from './CustomWatchlistVerification.styles';

export function CustomWatchlistVerification({ data: step }: {
  data: CustomWatchlistStep;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box>
      asd
    </Box>
  );
}

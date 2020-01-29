import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, Box } from '@material-ui/core';
import { useStyles } from './PricingTitle.styles';

export function PricingTitle() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box mb={3}>
      <Typography variant="h1" align="center" gutterBottom className={classes.title}>
        { intl.formatMessage({ id: 'apps.settings.pricing' }) }
      </Typography>
      <Typography variant="h4" align="center" className={classes.subtitle}>
        { intl.formatMessage({ id: 'PricingRefundNotice.title' }) }
      </Typography>
    </Box>
  );
}

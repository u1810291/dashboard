import React from 'react';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { useStyles } from './PricingMeta.styles';

export function PricingBadge({ text }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box className={classes.badge}>
      {intl.formatMessage({ id: text })}
    </Box>
  );
}

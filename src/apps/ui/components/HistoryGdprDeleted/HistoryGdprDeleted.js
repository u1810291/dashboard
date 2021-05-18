import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './HistoryGdprDeleted.styles';

export function HistoryGdprDeleted() {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Grid container>
      <Box p={1.5} color="common.black75" className={classes.gdprDeleted}>
        {intl.formatMessage({ id: 'VerificationHistory.gdprDeleted' })}
      </Box>
    </Grid>
  );
}

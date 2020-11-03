import {Box, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';

export const DirectLinkCopy = () => {
  const intl = useIntl();
  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'forDevs.directLinkCopy.header' })}</Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.directLinkCopy.subheader' })}
      </Box>
    </Grid>
  );
};

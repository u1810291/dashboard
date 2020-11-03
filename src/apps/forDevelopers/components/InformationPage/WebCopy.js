import {Box, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';

export const WebCopy = () => {
  const intl = useIntl();
  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'forDevs.informationPage.webCopy.header' })}</Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.informationPage.webCopy.subheader' })}
      </Box>
    </Grid>
  );
};

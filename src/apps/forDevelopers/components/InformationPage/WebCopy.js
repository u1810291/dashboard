import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';

export const WebCopy = () => {
  const intl = useIntl();
  return (
    <Grid container direction="column">
      <Typography>{intl.formatMessage({ id: 'forDevs.informationPage.webCopy.header' })}</Typography>
      <Typography>{intl.formatMessage({ id: 'forDevs.informationPage.webCopy.subheader' })}</Typography>
    </Grid>
  );
};

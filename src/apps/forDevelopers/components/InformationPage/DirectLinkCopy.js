import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';

export const DirectLinkCopy = () => {
  const intl = useIntl();
  return (
    <Grid container direction="column">
      <Typography>{intl.formatMessage({ id: 'forDevs.directLinkCopy.header' })}</Typography>
      <Typography>{intl.formatMessage({ id: 'forDevs.directLinkCopy.subheader' })}</Typography>
    </Grid>
  );
};

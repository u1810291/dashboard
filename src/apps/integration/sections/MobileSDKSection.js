import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as IconAndroid } from './icon-android.svg';
import { ReactComponent as IconIos } from './icon-ios.svg';
import { useStyles } from './MobileSDKSection.styles';

export function MobileSDKSection() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: 'MobileSDKSection.title' })}
          <Box className={classes.icon}>
            <IconIos />
          </Box>
          <Box className={classes.icon}>
            <IconAndroid />
          </Box>
        </Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'MobileSDKSection.description' })}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              startIcon={<IconIos />}
            >
              {intl.formatMessage({ id: 'MobileSDKSection.ctaIOS' })}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              href="https://github.com/MatiFace/mati-global-id-sdk-integration-android"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              startIcon={<IconAndroid />}
            >
              {intl.formatMessage({ id: 'MobileSDKSection.ctaAndroid' })}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

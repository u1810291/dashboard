import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Grid, Typography } from '@material-ui/core';
import SignInService from 'assets/signin-service.png';
import SignInSession from 'assets/signin-session.png';
import { useStyles } from './AuthDescription.styles';

export function AuthDescription() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Grid className={classes.description} direction="column" justify="center" alignItems="flex-start" container>
      <Box className={classes.descriptionWrapper}>
        <Typography variant="h2" className={classes.descriptionTitle}>
          {intl.formatMessage({ id: 'SignIn.description.title' })}
        </Typography>
        <Box className={classes.descriptionList}>
          <Typography variant="body1" className={classes.text}>
            {intl.formatMessage({ id: 'SignIn.description.text' })}
          </Typography>
          <img src={SignInSession} alt="" className={classes.descriptionImage} />
        </Box>
        <Box className={classes.service}>
          <img src={SignInService} alt="" />
          <Typography variant="body1" className={classes.serviceTitle}>
            {intl.formatMessage({ id: 'SignIn.description.serviceTitle' })}
          </Typography>
          <Typography variant="body1">
            {intl.formatMessage({
              id: 'SignIn.description.service',
            }, {
              breakingLine: <br />,
            })}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

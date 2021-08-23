import { Box, Grid } from '@material-ui/core';
import { Page404, PageError } from 'apps/layout';
import { VerificationContainer } from 'apps/Verification';
import { goToStartPage } from 'lib/url';
import { Routes } from 'models/Router.model';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { IdentityProfileErrorTypes } from '../../models/IdentityProfile.model';
import { selectIdentityProfileModel } from '../../store/IdentityProfile.selectors';
import { IdentityProfileHeaderMenu } from '../IdentityProfileHeaderMenu/IdentityProfileHeaderMenu';
import { SideProfileMenu } from '../SideProfileMenu/SideProfileMenu';
import { useStyles } from './IdentityProfile.styles';

export function IdentityProfile() {
  const [errorType, setErrorType] = useState<IdentityProfileErrorTypes>(null);
  const identityProfileModel = useSelector(selectIdentityProfileModel);
  const classes = useStyles();

  const IdentityProfileErrorScreens = useMemo(() => ({
    [IdentityProfileErrorTypes.RequestError]: (<PageError onRetry={goToStartPage} />),
    [IdentityProfileErrorTypes.IdentityNotFound]: (<Page404 />),
  }), []);

  if (errorType) {
    return (IdentityProfileErrorScreens[errorType] || IdentityProfileErrorScreens[IdentityProfileErrorTypes.RequestError]);
  }

  return (
    <Box p={2} height="100%">
      <Grid container direction="column" wrap="nowrap" className={classes.wrapper}>
        <Box mb={1.5}>
          <IdentityProfileHeaderMenu />
        </Box>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.sidebar}>
            <SideProfileMenu onError={setErrorType} profile={identityProfileModel?.value} />
          </Grid>
          <Grid item xs={12} className={classes.content}>
            <Route path={`${Routes.identity.profile.details}${Routes.identity.verification.details}`}>
              <VerificationContainer />
            </Route>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

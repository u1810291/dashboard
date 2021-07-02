import { Box, Container, Grid } from '@material-ui/core';
import { Page404, PageError, PageLoader } from 'apps/layout';
import { selectVerificationsCollectionModel, VerificationContainer } from 'apps/Verification';
import { verificationListLoad } from 'apps/Verification/state/Verification.actions';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { goToStartPage } from 'lib/url';
import { Routes } from 'models/Router.model';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';
import { IdentityProfileErrorTypes } from '../../models/IdentityProfile.model';
import { identityProfileLoad } from '../../store/IdentityProfile.actions';
import { selectIdentityProfileModel } from '../../store/IdentityProfile.selectors';
import { IdentityProfileHeaderMenu } from '../IdentityProfileHeaderMenu/IdentityProfileHeaderMenu';
import { SideProfileMenu } from '../SideProfileMenu/SideProfileMenu';
import { useStyles } from './IdentityProfile.styles';

export function IdentityProfile() {
  const dispatch = useDispatch();
  const [errorType, setErrorType] = useState<IdentityProfileErrorTypes>(null);
  const identityProfileModel = useSelector(selectIdentityProfileModel);
  const verificationsModel = useSelector(selectVerificationsCollectionModel);
  const { identityId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(identityProfileModel)) {
        try {
          await dispatch(identityProfileLoad(identityId));
        } catch (error) {
          if (error?.response?.status === 404) {
            setErrorType(IdentityProfileErrorTypes.IdentityNotFound);
          } else {
            setErrorType(IdentityProfileErrorTypes.RequestError);
          }
          console.error(error);
        }
      }
    };

    loadData();
  }, [dispatch, identityId, identityProfileModel]);

  useEffect(() => {
    const loadData = async () => {
      if (LoadableAdapter.isPristine(verificationsModel)) {
        try {
          await dispatch(verificationListLoad(identityId));
        } catch (error) {
          setErrorType(IdentityProfileErrorTypes.RequestError);
          console.error(error);
        }
      }
    };

    loadData();
  }, [dispatch, identityId, verificationsModel]);

  const IdentityProfileErrorScreens = useMemo(() => ({
    [IdentityProfileErrorTypes.RequestError]: (<PageError onRetry={goToStartPage} />),
    [IdentityProfileErrorTypes.IdentityNotFound]: (<Page404 />),
  }), []);

  if (identityProfileModel.isLoading || verificationsModel.isLoading) {
    return <PageLoader />;
  }

  if (errorType) {
    return (IdentityProfileErrorScreens[errorType] || IdentityProfileErrorScreens[IdentityProfileErrorTypes.RequestError]);
  }

  return (
    <Container maxWidth={false}>
      <Box pt={2}>
        <Box mb={1.5}>
          <IdentityProfileHeaderMenu />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.sidebar}>
            <SideProfileMenu profile={identityProfileModel?.value} />
          </Grid>
          <Grid item xs={12} className={classes.container}>
            {!verificationsModel.isLoading && verificationsModel.isLoaded && (
              <Route path={`${Routes.identity.profile.details}${Routes.identity.verification.details}`}>
                <VerificationContainer />
              </Route>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

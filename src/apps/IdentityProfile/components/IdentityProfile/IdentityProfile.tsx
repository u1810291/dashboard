import { Box, Grid } from '@material-ui/core';
import { Page404, PageError, PageLoader } from 'apps/layout';
import { selectVerificationsCollectionModel, VerificationContainer } from 'apps/Verification';
import { verificationListClear, verificationListLoad } from 'apps/Verification/state/Verification.actions';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { goToStartPage, useQuery } from 'lib/url';
import { Routes } from 'models/Router.model';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';
import { IdentityProfileErrorTypes } from '../../models/IdentityProfile.model';
import { identityProfileClear, identityProfileLoad } from '../../store/IdentityProfile.actions';
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
  const { asMerchantId } = useQuery();
  const classes = useStyles();

  useEffect(() => () => {
    dispatch(identityProfileClear());
    dispatch(verificationListClear());
  }, [dispatch]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(identityProfileModel)) {
      try {
        dispatch(identityProfileLoad(identityId, asMerchantId));
      } catch (error) {
        if (error?.response?.status === 404) {
          setErrorType(IdentityProfileErrorTypes.IdentityNotFound);
        } else {
          setErrorType(IdentityProfileErrorTypes.RequestError);
        }
        console.error(error);
      }
    }
  }, [dispatch, asMerchantId, identityId, identityProfileModel]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(verificationsModel)) {
      try {
        dispatch(verificationListLoad(identityId, asMerchantId));
      } catch (error) {
        setErrorType(IdentityProfileErrorTypes.RequestError);
        console.error(error);
      }
    }
  }, [dispatch, asMerchantId, identityId, verificationsModel]);

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
    <Box p={2} height="100%">
      <Grid container direction="column" wrap="nowrap" className={classes.wrapper}>
        <Box mb={1.5}>
          <IdentityProfileHeaderMenu />
        </Box>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.sidebar}>
            <SideProfileMenu profile={identityProfileModel?.value} />
          </Grid>
          <Grid item xs={12} className={classes.content}>
            {!verificationsModel.isLoading && verificationsModel.isLoaded && (
              <Route path={`${Routes.identity.profile.details}${Routes.identity.verification.details}`}>
                <VerificationContainer />
              </Route>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

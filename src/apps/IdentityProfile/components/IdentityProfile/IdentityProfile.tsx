import React, { useEffect, useMemo, useState } from 'react';
import { Container, Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { Page404, PageError, PageLoader } from 'apps/layout';
import { goToStartPage } from 'lib/url';
import { identityProfileLoad } from 'state/identities/identities.actions';
import { selectIdentityProfileModel } from 'state/identities/identities.selectors';
import { Routes } from 'models/Router.model';
import { Placeholder } from 'apps/ui';
import { ReactComponent as UserDeletedIcon } from 'assets/profile-pic-round.svg';
import { useIntl } from 'react-intl';
import { selectVerificationsCollectionModel, verificationsCollectionLoad } from 'apps/verification';
import { IdentityProfileErrorTypes } from '../../models/identityProfile.model';
import { useStyles } from './IdentityProfile.styles';
import { VerificationContainer } from '../VerificationContainer/VerificationContainer';
import { SideProfileMenu } from '../SideProfileMenu/SideProfileMenu';
import { IdentityProfileHeaderMenu } from '../IdentityProfileHeaderMenu/IdentityProfileHeaderMenu';

export function IdentityProfile() {
  const dispatch = useDispatch();
  const intl = useIntl();
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
          if (error.response.status === 404) {
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
          await dispatch(verificationsCollectionLoad(identityId));
        } catch (error) {
          setErrorType(IdentityProfileErrorTypes.RequestError);
          console.error(error);
        }
      }
    };

    loadData();
  }, [dispatch, identityId, verificationsModel]);

  const IdentityProfileErrorScreens = useMemo(() => ({
    [IdentityProfileErrorTypes.UserDeleted]:
    (<Placeholder icon={<UserDeletedIcon />} subtitle={intl.formatMessage({ id: 'IdentityProfile.placeholder.deleted' })} />),
    [IdentityProfileErrorTypes.UserDeletedByGdpr]:
    (<Placeholder icon={<UserDeletedIcon />} subtitle={intl.formatMessage({ id: 'IdentityProfile.placeholder.gdprDeleted' })} />),
    [IdentityProfileErrorTypes.RequestError]: (<PageError onRetry={goToStartPage} />),
    [IdentityProfileErrorTypes.IdentityNotFound]: (<Page404 />),
  }), [intl]);

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
            <SideProfileMenu />
          </Grid>
          <Grid item xs={12} className={classes.container}>
            <Route path={`${Routes.identity.profile.details}${Routes.identity.verification.details}`}>
              <VerificationContainer />
            </Route>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

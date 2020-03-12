import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Page404, PageError, PageLoader } from 'apps/layout';
import { isNotFound } from 'models/Error.model';
import { getIdentityShortId } from 'models/Identity.model';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountries } from 'state/countries/countries.actions';
import { identityDemoLoad, identityLoad } from 'state/identities/identities.actions';
import { selectIdentityModel } from 'state/identities/identities.selectors';
import { Verification } from './Verification';
import { VerificationSidePanel } from '../../components/VerificationSidePanel/VerificationSidePanel';

export function VerificationDetail() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id, demoId } = useParams();
  const identityModel = useSelector(selectIdentityModel);

  useEffect(() => {
    // common data
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // data for identity
      dispatch(identityLoad(id));
    }
    if (demoId) {
      // data for demo
      dispatch(identityDemoLoad(demoId));
    }
  }, [dispatch, id, demoId]);

  if (!identityModel.isLoaded && identityModel.isLoading) {
    return <PageLoader />;
  }

  if (identityModel.isFailed) {
    return isNotFound(identityModel.error)
      ? <Page404 />
      : <PageError />;
  }

  if (!identityModel.value) {
    return <Page404 />;
  }

  return (
    <Container>
      <Box py={3}>
        <Box mb={3} fontWeight="bold">
          <Typography variant="h2">
            {intl.formatMessage({ id: 'identity.title' }, { id: getIdentityShortId(identityModel.value.id) })}
          </Typography>
        </Box>

        <Grid container spacing={2} direction="row">
          <Grid item xs={9}>
            <Verification identity={identityModel.value} />
          </Grid>
          <Grid item xs={3}>
            <VerificationSidePanel identity={identityModel.value} isDemo={!!demoId} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Page404, PageError } from 'apps/layout';
import { isNotFound } from 'models/Error.model';
import { getIdentityShortId } from 'models/Identity.model';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { identityClear, identityDemoLoad, identityLoad } from 'state/identities/identities.actions';
import { selectIdentityModelWithExtras } from 'state/identities/identities.selectors';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { VerificationFlowName } from '../../components/VerificationFlowName/VerificationFlowName';
import { VerificationSidePanel } from '../../components/VerificationSidePanel/VerificationSidePanel';
import { Verification } from './Verification';

export function VerificationDetail() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id, demoId } = useParams();
  const identityModel = useSelector(selectIdentityModelWithExtras);

  useEffect(() => {
    if (id) {
      // data for identity
      dispatch(identityLoad(id));
    }
    if (demoId) {
      // data for demo
      dispatch(identityDemoLoad(demoId));
    }
    return () => dispatch(identityClear());
  }, [dispatch, id, demoId]);

  if (identityModel.isFailed) {
    return isNotFound(identityModel.error)
      ? <Page404 />
      : <PageError />;
  }

  if (identityModel.isLoaded && !identityModel.value) {
    return <Page404 />;
  }

  if (LoadableAdapter.isPristine(identityModel) || (!identityModel.isLoaded && identityModel.isLoading)) {
    return null;
  }

  return (
    <Container>
      <Box py={3}>
        <Box mb={3}>
          <Typography variant="h2">
            {intl.formatMessage({ id: 'identity.title' }, { id: getIdentityShortId(identityModel.value.id) })}
          </Typography>
          <Box mt={0.5}>
            <VerificationFlowName flowId={identityModel.value.flowId} />
          </Box>
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

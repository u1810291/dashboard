import { Box, Container } from '@material-ui/core';
import { Page404, PageError } from 'apps/layout';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useLongPolling } from 'lib/longPolling.hook';
import { isNotFound } from 'models/Error.model';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { identityClear, identityDemoLoad, identityLoad } from 'state/identities/identities.actions';
import { selectIdentityModelWithExtras } from 'state/identities/identities.selectors';
import { VerificationHeader } from '../../components/VerificationHeader/VerificationHeader';
import { Verification } from './Verification';

export function VerificationDetail() {
  const dispatch = useDispatch();
  const { id, demoId } = useParams();
  const identityModel = useSelector(selectIdentityModelWithExtras);

  const handleLoad = useCallback((isReload) => {
    if (id) {
      // data for identity
      dispatch(identityLoad(id, isReload));
    }
    if (demoId) {
      // data for demo
      dispatch(identityDemoLoad(demoId));
    }
    return () => dispatch(identityClear());
  }, [dispatch, id, demoId]);

  useLongPolling(handleLoad);

  if (identityModel.isFailed) {
    return isNotFound(identityModel.error)
      ? <Page404 />
      : <PageError />;
  }

  if (!identityModel.value) {
    return <></>; // skeleton loader will appear here
  }

  if (LoadableAdapter.isPristine(identityModel) || (!identityModel.isLoaded && identityModel.isLoading)) {
    return null;
  }

  return (
    <Container maxWidth="initial">
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={1}>
          <VerificationHeader identity={identityModel.value} isDemo={!!demoId} />
        </Box>
        <Verification identity={identityModel.value} />
      </Box>
    </Container>
  );
}

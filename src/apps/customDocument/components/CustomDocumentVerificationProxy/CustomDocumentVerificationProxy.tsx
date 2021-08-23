import { Grid } from '@material-ui/core';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useLongPolling } from 'lib/longPolling.hook';
import { useQuery } from 'lib/url';
import { VerificationResponse } from 'models/Verification.model';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { identityClear, identityLoad, verificationDocumentUpdate } from 'state/identities/identities.actions';
import { selectIdentityModelWithExtras } from 'state/identities/identities.selectors';
import { useParams } from 'react-router-dom';
import { CustomDocumentVerification } from '../CustomDocumentVerification/CustomDocumentVerification';

export function CustomDocumentVerificationProxy({ data }: {data: VerificationResponse}) {
  const dispatch = useDispatch();
  const { identityId } = useParams();
  const identityModel = useSelector(selectIdentityModelWithExtras);

  const { asMerchantId } = useQuery();

  const handleLoad = useCallback((isReload) => {
    if (identityId) {
      dispatch(identityLoad(identityId, isReload, asMerchantId));
    }
    return () => dispatch(identityClear());
  }, [identityId, dispatch, asMerchantId]);

  useLongPolling(handleLoad);

  const handleDocumentUpdate = useCallback((documentType) => async (normalizedData) => {
    if (documentType && normalizedData) {
      await dispatch(verificationDocumentUpdate(data.id, documentType, normalizedData));
    }
  }, [dispatch, data.id]);

  if (LoadableAdapter.isPristine(identityModel) || (!identityModel.isLoaded && identityModel.isLoading)) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {data.documents.map((doc, index) => (
        <Grid item key={index}>
          <CustomDocumentVerification document={doc} identity={identityModel.value} onDocumentUpdate={handleDocumentUpdate(doc.type)} isFlowBuilder />
        </Grid>
      ))}
    </Grid>
  );
}

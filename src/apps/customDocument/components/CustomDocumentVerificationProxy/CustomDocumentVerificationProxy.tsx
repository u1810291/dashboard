import { Grid } from '@material-ui/core';
import { VerificationResponse } from 'models/Verification.model';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { verificationDocumentUpdate } from 'state/identities/identities.actions';
import { CustomDocumentVerification } from '../CustomDocumentVerification/CustomDocumentVerification';

export function CustomDocumentVerificationProxy({ data }: { data: VerificationResponse }) {
  const dispatch = useDispatch();

  const handleDocumentUpdate = useCallback((documentType) => async (normalizedData) => {
    if (documentType && normalizedData) {
      await dispatch(verificationDocumentUpdate(data.id, documentType, normalizedData));
    }
  }, [dispatch, data.id]);

  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {data.documents.map((doc, index) => (
        <Grid item key={index}>
          <CustomDocumentVerification
            document={doc}
            identity={{
              id: data.identity,
              isEditable: data.isEditable,
            }}
            onDocumentUpdate={handleDocumentUpdate(doc.type)}
            isFlowBuilder
          />
        </Grid>
      ))}
    </Grid>
  );
}

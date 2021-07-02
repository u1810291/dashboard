import { Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Verification } from 'models/Verification.model';
import { newVerificationDocumentUpdate } from 'state/verification/verification.actions';
import { NewDocumentStep } from '../NewDocumentStep/NewDocumentStep';

export function DocumentVerificationProduct({ data }: {
  data: Verification,
}) {
  const dispatch = useDispatch();

  const handleDocumentUpdate = useCallback((documentType) => async (normalizedData) => {
    if (data?.id && documentType && normalizedData) {
      await dispatch(newVerificationDocumentUpdate(data.id, documentType, normalizedData));
    }
  }, [dispatch, data]);

  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {data.documents.map((doc, index) => (
        <Grid item key={doc.type}>
          <NewDocumentStep
            onDocumentUpdate={handleDocumentUpdate(data.documents[index]?.type)}
            verification={data}
            document={doc}
            documentIndex={index}
          />
        </Grid>
      ))}
    </Grid>
  );
}

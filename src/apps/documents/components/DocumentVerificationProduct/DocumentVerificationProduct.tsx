import { Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { VerificationResponse } from 'models/VerificationOld.model';
import { newVerificationDocumentUpdate } from 'state/verification/verification.actions';
import { reviewPatchDocumentFields } from 'apps/reviewMode/state/reviewMode.actions';
import { NewDocumentStep } from '../NewDocumentStep/NewDocumentStep';

export function DocumentVerificationProduct({ data, isReviewMode }: {
  data: VerificationResponse;
  isReviewMode: boolean;
}) {
  const dispatch = useDispatch();

  const handleDocumentUpdate = useCallback((documentType) => async (normalizedData) => {
    if (!data?.id || !documentType || !normalizedData) {
      return;
    }
    if (isReviewMode) {
      dispatch(reviewPatchDocumentFields(data.id, documentType, normalizedData));
      return;
    }
    dispatch(newVerificationDocumentUpdate(data.id, documentType, normalizedData));
  }, [data.id, isReviewMode, dispatch]);

  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {data?.documents?.map((doc, index) => (
        <Grid item key={doc.type}>
          { /* TODO: @vladislav.snimshchikov Add a new method to products to get verification for review mode and set the value isEditable in new method */}
          <NewDocumentStep
            onDocumentUpdate={handleDocumentUpdate(data.documents[index]?.type)}
            verification={{ ...data, ...(isReviewMode && { isEditable: true }) }}
            document={doc}
            documentIndex={index}
          />
        </Grid>
      ))}
    </Grid>
  );
}

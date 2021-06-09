import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verificationLoad } from 'apps/verification';
import { VerificationHeaderMenu } from '../VerificationHeaderMenu/VerificationHeaderMenu';

export function VerificationContainer() {
  const dispatch = useDispatch();
  const { identityId, verificationId } = useParams();

  useEffect(() => {
    if (identityId && verificationId) {
      dispatch(verificationLoad(identityId, verificationId));
    }
  }, [dispatch, identityId, verificationId]);
  return (
    <Paper><VerificationHeaderMenu /></Paper>
  );
}

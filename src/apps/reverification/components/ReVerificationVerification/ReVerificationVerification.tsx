import { Box } from '@material-ui/core';
import React from 'react';
import { ReFacematch } from '../ReFacematch/ReFacematch';
import { IReverificationVerification } from '../../models/ReVerification.model';

export function ReVerificationVerification({
  data: {
    reVerification: { reFacematch },
    identity,
  },
}: {
  data: IReverificationVerification;
}) {
  return (
    <Box>
      <ReFacematch reFacematch={reFacematch} identity={identity} />
    </Box>
  );
}

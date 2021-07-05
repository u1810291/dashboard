import { Grid } from '@material-ui/core';
import { LivenessConslusion } from 'apps/biometrics/components/LivenessConslusion/LivenessConslusion';
import { CheckResultLogo } from 'apps/ui';
import { IReFacematchStep } from 'models/ReVerification.model';
import React from 'react';
import { ReVerificationLivenssMedia } from '../ReVerificationLivenssMedia/ReVerificationLivenssMedia';

export function ReFacematch({
  reFacematch,
  identity,
}: {
  reFacematch: IReFacematchStep;
  identity: string;
}) {
  return (
    <Grid container spacing={2}>
      {reFacematch?.data && (
        <Grid item xs={12} lg={12} xl={5}>
          <ReVerificationLivenssMedia reFacematch={reFacematch} identity={identity} />
        </Grid>
      )}
      <Grid item xs={12} lg={12} xl={7}>
        <LivenessConslusion steps={[reFacematch]}>
          <CheckResultLogo status={reFacematch?.checkStatus} type="reFacematch" />
        </LivenessConslusion>
      </Grid>
    </Grid>
  );
}

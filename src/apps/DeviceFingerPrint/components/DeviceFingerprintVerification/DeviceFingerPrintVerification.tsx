import React from 'react';
import { Grid } from '@material-ui/core';
import { DeviceFingerPrintInputData } from '../../models/DeviceFingerPrint.model';
import { VerificationDeviceCheckCard } from '../VerificationDeviceCheckCard/VerificationDeviceCheckCard';

export function DeviceFingerprintVerification({ data }: {
  data: DeviceFingerPrintInputData,
}) {
  return (
    <Grid container>
      <Grid item xs={12} lg={10} xl={5}>
        <VerificationDeviceCheckCard input={data} />
      </Grid>
    </Grid>
  );
}

import React from 'react';
import { Grid } from '@material-ui/core';
import { DeviceFingerPrintInputData } from '../../models/DeviceFingerPrint.model';
import { VerificationDeviceCheckCard } from '../VerificationDeviceCheckCard/VerificationDeviceCheckCard';
import { useStyles } from './DeviceFingerPrintVerification.styles';

export function DeviceFingerprintVerification({ data }: {
  data: DeviceFingerPrintInputData;
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} xl={4} className={classes.wrapper}>
        <VerificationDeviceCheckCard input={data} />
      </Grid>
    </Grid>
  );
}

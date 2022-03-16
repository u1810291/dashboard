import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomField } from '../../models/CustomField.model';
import { useStyles } from './CustomFieldVerification.styles';
import { CustomFieldVerificationCard } from '../CustomFieldVerificationCard/CustomFieldVerificationCard';

export function CustomFieldVerification({ data }: {
  data: CustomField[];
}) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} xl={4} className={classes.root}>
        <CustomFieldVerificationCard data={data} />
      </Grid>
    </Grid>
  );
}

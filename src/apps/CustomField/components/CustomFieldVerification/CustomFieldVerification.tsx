import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './CustomFieldVerification.styles';
import { CustomFieldVerificationCard } from '../CustomFieldVerificationCard/CustomFieldVerificationCard';
import { CustomFieldDataForVerificationComponent } from '../../../../models/CustomField.model';

export function CustomFieldVerification({ data }: {
  data: CustomFieldDataForVerificationComponent;
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} xl={4} className={classes.root}>
        <CustomFieldVerificationCard isOldVerification={data.isOldVerification} country={data.country} fields={data.fields} />
      </Grid>
    </Grid>
  );
}

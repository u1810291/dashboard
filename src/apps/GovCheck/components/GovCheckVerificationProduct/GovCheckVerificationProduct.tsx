import { Grid } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks';
import { CheckBarExpandable, ChecksByDocument } from 'apps/ui';
import React from 'react';
import { useStyles } from './GovCheckVerificationProduct.styles';
import { GovCheckVerificationData } from '../../models/GovCheck.model';

export function GovCheckVerificationProduct({ data }: {
  data: GovCheckVerificationData;
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {data.document?.map(({ govChecksSteps, type, country, photos }, index) => (
        <Grid item xs={12} xl={4} className={classes.wrapper}>
          <ChecksByDocument photos={photos} country={country} docType={type} key={type || index}>
            {govChecksSteps?.map((step) => (
              <CheckBarExpandable step={step} key={step.id}>
                <CheckStepDetails step={step} isGovCheck />
              </CheckBarExpandable>
            ))}
          </ChecksByDocument>
        </Grid>
      ))}
      {data.govCheckWithoutDocument?.map((step) => (
        <Grid item xs={12} xl={4} className={classes.wrapper}>
          <CheckBarExpandable step={step} key={step.id}>
            <CheckStepDetails step={step} isGovCheck />
          </CheckBarExpandable>
        </Grid>
      ))}
    </Grid>
  );
}

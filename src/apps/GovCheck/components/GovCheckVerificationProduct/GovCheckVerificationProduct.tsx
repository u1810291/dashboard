import Grid from '@material-ui/core/Grid';
import { CheckStepDetails } from 'apps/checks';
import { CheckBarExpandable, ChecksByDocument } from 'apps/ui';
import React from 'react';
import { GovCheckText } from '../GovCheckText/GovCheckText';
import { GovCheckVerificationData } from '../../models/GovCheck.model';
import { RootGovChecksErrorsToHide } from 'models/Step.model';

export function GovCheckVerificationProduct({ data }: {
  data: GovCheckVerificationData;
}) {
  return (
    <Grid container spacing={2}>
      {data.document?.map(({ govChecksSteps, type, country, photos }, index) => (
        <Grid item xs={8}>
          <ChecksByDocument photos={photos} country={country} docType={type} key={type || index}>
            {govChecksSteps?.filter(({ error }) => !error || !RootGovChecksErrorsToHide[error.code]).map((step) => (
              <CheckBarExpandable step={step} key={step.title} title={step.title}>
                <CheckStepDetails>
                  <GovCheckText step={step} isShowError={step.isShowError} />
                </CheckStepDetails>
              </CheckBarExpandable>
            ))}
          </ChecksByDocument>
        </Grid>
      ))}
      {data.govCheckWithoutDocument?.map((step) => (
        <Grid item xs={8}>
          <CheckBarExpandable step={step} key={step.id}>
            <CheckStepDetails step={step}>
              <GovCheckText step={step} />
            </CheckStepDetails>
          </CheckBarExpandable>
        </Grid>
      ))}
    </Grid>
  );
}

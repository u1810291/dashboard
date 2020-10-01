import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { getBiometricStatus } from 'models/Biometric.model';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { BiometricCheckSummary } from '../BiometricCheckSummary/BiometricCheckSummary';
import { DocumentCheckSummary } from '../DocumentCheckSummary/DocumentCheckSummary';

export function CheckSummary({ identity }) {
  const intl = useIntl();
  let count = 0;

  const biometricStatus = getBiometricStatus(identity.biometric);
  const isBiometricFailed = biometricStatus && biometricStatus.checkStatus === StepStatus.Failure;
  if (isBiometricFailed) {
    count += 1;
  }

  const failedDocs = identity.documents
    .map((doc) => ({
      ...doc,
      steps: doc.steps.filter((item) => item.checkStatus === StepStatus.Failure),
    }))
    .filter((doc) => doc.steps.length > 0);

  count += failedDocs.reduce((memo, doc) => doc.steps.length + memo, 0);

  if (count === 0) {
    return null;
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h4">{intl.formatMessage({ id: 'CheckSummary.title' }, { count })}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {isBiometricFailed && (
            <Grid item key="biometric" xs={12}>
              <BiometricCheckSummary status={biometricStatus} />
            </Grid>
          )}
          {failedDocs.map((doc) => (
            <Grid item key={doc.type} xs={12}>
              <DocumentCheckSummary document={doc} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

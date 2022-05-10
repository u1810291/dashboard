import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { selectVerificationStepsExtra } from 'apps/Verification';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { IStep } from 'models/Step.model';
import { IBackgroundCheckStepData } from 'models/BackgroundCheck.model';
import { BackgroundChecksBrazilianChecks } from '../BackgroundChecksBrazilianChecks/BackgroundChecksBrazilianChecks';
import { BackgroundChecksMexicanBuholegal } from '../BackgroundChecksMexicanBuholegal/BackgroundChecksMexicanBuholegal';

export function BackgroundCheckVerificationProduct() {
  const verificationStepsExtra = useSelector(selectVerificationStepsExtra);
  const mexicanBuholegalSteps: IStep<IBackgroundCheckStepData>[] = useMemo(() => verificationStepsExtra.filter((step) => VerificationPatternTypes.BackgroundMexicanBuholegal === step.id), [verificationStepsExtra]);
  const brazilianChecksSteps: IStep<IBackgroundCheckStepData>[] = useMemo(() => verificationStepsExtra.filter((step) => VerificationPatternTypes.BackgroundBrazilianChecks === step.id), [verificationStepsExtra]);

  return (
    <Grid>
      {mexicanBuholegalSteps.map((step, index) => (
        <BackgroundChecksMexicanBuholegal step={step} key={index} />
      ))}
      {brazilianChecksSteps.map((step, index) => (
        <BackgroundChecksBrazilianChecks step={step} key={index} />
      ))}
    </Grid>
  );
}

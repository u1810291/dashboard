import React from 'react';
import { useIntl } from 'react-intl';
import { DocumentStepTypes, StepStatus, IStep } from 'models/Step.model';

export function CheckText({ step }: {step: IStep<any> & any}) {
  const intl = useIntl();
  const extraData = step.labelExtraData || {};

  if ([DocumentStepTypes.AlternationDetection, DocumentStepTypes.ReFacematch, DocumentStepTypes.Watchlists].includes(step.id) && step.checkStatus === StepStatus.Failure) {
    const errorCode = step.error.code;

    return (
      <>
        {
          intl.formatMessage({
            id: errorCode ? `SecurityCheckStep.${errorCode}` : `SecurityCheckStep.${step.id}.${step.checkStatus}`,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
          })
        }
      </>
    );
  }

  if (step.labelExtra) {
    return (
      <>
        {
          intl.formatMessage({
            id: step.labelExtra,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
          }, step.labelExtraData)
        }
      </>
    );
  }

  return (
    <>
      {
        intl.formatMessage({
          id: `SecurityCheckStep.${step.id}.${step.checkStatus}`,
          defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
        }, extraData)
      }
    </>
  );
}

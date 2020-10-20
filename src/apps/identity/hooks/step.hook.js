import React from 'react';
import { BiometricSteps } from 'models/Biometric.model';
import { DocumentMxSteps, DocumentStepTypes, LEGACY_ERROR, StepStatus } from 'models/Step.model';
import { useIntl } from 'react-intl';
import { get } from 'lodash';
import { CheckStepDetailsEntry } from '../components/CheckStepDetails/CheckStepDetailsEntry';

export function useStatusLabel(step) {
  const intl = useIntl();

  if (step.error && (DocumentMxSteps.includes(step.id) || BiometricSteps.includes(step.id))) {
    return intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}` });
  }

  let { labelStatusData } = step;

  if (step.labelStatusDataIntl) {
    labelStatusData = {};
    Object.keys(step.labelStatusDataIntl).forEach((key) => {
      const value = step.labelStatusDataIntl[key];
      if (Array.isArray(value)) {
        labelStatusData[key] = value.map((id) => intl.formatMessage({ id })).join(', ');
      } else {
        labelStatusData[key] = intl.formatMessage({ id: value });
      }
    });
  }

  const error = step.error || {};

  return intl.formatMessage({
    id: error.code && error.type !== LEGACY_ERROR
      ? `SecurityCheckStep.${error.code}`
      : `SecurityCheckStep.${step.id}.${step.checkStatus}`,
    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
  }, labelStatusData);
}

export function useCheckText(step) {
  const intl = useIntl();
  const extraData = step.labelExtraData || {};

  if (step.id === DocumentStepTypes.AlternationDetection && step.checkStatus === StepStatus.Failure) {
    const errorCode = get(step, 'error.code');

    return intl.formatMessage({
      id: errorCode ? `SecurityCheckStep.${errorCode}` : `SecurityCheckStep.${step.id}.${step.checkStatus}`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
    });
  }

  return intl.formatMessage({
    id: `SecurityCheckStep.${step.id}.${step.checkStatus}`,
    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
  }, extraData);
}

export function useGovCheckText(step) {
  const intl = useIntl();
  const { error, checkStatus: status } = step;

  if (status === StepStatus.Success) {
    return Object.entries(step.data || {}).map(([key, value]) => <CheckStepDetailsEntry label={key} value={value} key={key} />);
  }

  if (error) {
    return intl.formatMessage({
      id: `SecurityCheckStep.${error.code}.message`,
      defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` }),
    });
  }

  return intl.formatMessage({ id: `SecurityCheckStep.govCheck.${status}` });
}

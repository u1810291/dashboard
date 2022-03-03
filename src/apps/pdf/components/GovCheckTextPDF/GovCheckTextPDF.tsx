import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { Text, View } from '@react-pdf/renderer';
import { isSecondaryGovCheckError, StepStatus } from 'models/Step.model';
import { GovCheckIStep, useGovCheckData } from 'apps/GovCheck';
import { commonStyles } from '../../PDF.styles';

export function GovCheckTextPDF({ step, isShowError = true }: {
  step: GovCheckIStep;
  isShowError?: boolean;
}) {
  const formatMessage = useFormatMessage();
  const { id, error, checkStatus: status } = step;
  const stepDataEntries = useGovCheckData(step, true);

  if (status === StepStatus.Success && !!stepDataEntries.length) {
    return !!stepDataEntries.length && (
      <View>
        {stepDataEntries}
      </View>
    );
  }

  if (error) {
    const { code: errorCode } = error;

    if (stepDataEntries.length && isSecondaryGovCheckError(id, errorCode)) {
      return (
        <>
          {isShowError && (
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {
                formatMessage(`SecurityCheckStep.${errorCode}.message`, { defaultMessage: formatMessage(`SecurityCheckStep.govCheck.${status}`) })
              }
            </Text>
          )}
          {!!stepDataEntries.length && (
            <View>
              {stepDataEntries}
            </View>
          )}
        </>
      );
    }
    return isShowError && (
      <Text style={commonStyles.title}>
        {
          formatMessage(`SecurityCheckStep.${errorCode}.message`, { defaultMessage: formatMessage(`SecurityCheckStep.govCheck.${status}`) })
        }
      </Text>
    );
  }

  return (
    <Text style={commonStyles.title}>
      {error ? formatMessage(`SecurityCheckStep.${error.code}.message`, { defaultMessage: formatMessage(`SecurityCheckStep.govCheck.${status}`) }) : formatMessage(`SecurityCheckStep.govCheck.${status}`)}
    </Text>
  );
}

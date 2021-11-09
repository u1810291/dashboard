import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { PhoneValidationTypes, PhoneValidationStep } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { getStepStatus } from 'models/Step.model';
import { isNil } from 'lib/isNil';
import { styles } from './PhoneValidationPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';

export interface PhoneValidationPDFProps {
  step: PhoneValidationStep;
}

export function PhoneValidationPDF({ step = {} }: PhoneValidationPDFProps) {
  const intl = useIntl();
  // @ts-ignore
  const statusCode = getStepStatus(step);
  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'SecurityCheckStep.phoneOwnership.title' })}
        </Text>
      </View>
      {step.error && (
        <View>
          <Text>
            {intl.formatMessage({
              id: `SecurityCheckStep.${step.error.code}`,
              defaultMessage: intl.formatMessage({ id: 'Error.common' }),
            })}
          </Text>
        </View>
      )}
      {step?.data && (
        <View style={styles.stepDetailsContainer}>
          {Object.keys(PhoneValidationTypes).map((fieldName) => !isNil(step.data[PhoneValidationTypes[fieldName]]) && (
            <CheckStepDetailsEntryPDF
              label={PhoneValidationTypes[fieldName]}
              value={step.data[PhoneValidationTypes[fieldName]]}
              key={PhoneValidationTypes[fieldName]}
              style={styles.stepDetailsItem}
            />
          ))}
        </View>
      )}
    </View>
  );
}

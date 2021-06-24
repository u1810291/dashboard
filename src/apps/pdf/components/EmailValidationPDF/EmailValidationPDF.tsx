import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { EmailValidationFields, EmailValidationExtra } from 'models/EmailValidation.model';
import { getStepStatus } from 'models/Step.model';
import { styles } from './EmailValidationPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';

export function EmailValidationPDF({ step }: { step: EmailValidationExtra }) {
  const intl = useIntl();
  const statusCode = getStepStatus(step);

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'SecurityCheckStep.emailOwnership.title' })}
        </Text>
      </View>
      {!!step.error && (
        <View>
          <Text>{intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}` })}</Text>
        </View>
      )}
      {!!step.data && (
        <View style={styles.stepDetailsContainer}>
          {EmailValidationFields.map(({ fieldName }) => {
            if (step.data[fieldName]) {
              return (
                <View style={styles.stepDetailsItem} key={fieldName}>
                  <CheckStepDetailsEntryPDF
                    label={fieldName}
                    value={step.data[fieldName]}
                    style={styles.stepDetailsItem}
                  />
                </View>
              );
            }
            return null;
          })}
        </View>
      )}
    </View>
  );
}

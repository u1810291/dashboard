import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { EmailRiskStep, EmailRiskFieldTypes, EmailValidationFields, EmailRiskFields } from 'models/EmailCheck.model';
import { isNil } from 'lib/isNil';
import { getStepStatus } from 'models/Step.model';
import { styles } from './RiskEmailPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';


export function RiskEmailPDF({ step }: { step: EmailRiskStep}) {
  const intl = useIntl();
  const statusCode = getStepStatus(step);

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'SecurityCheckStep.emailRisk.title' })}
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
      <View style={styles.stepDetailsContainer}>
        {Object.keys(EmailRiskFieldTypes).map((fieldName) => (!isNil(step?.data[EmailRiskFieldTypes[fieldName]])) && (
          <CheckStepDetailsEntryPDF
            label={EmailRiskFieldTypes[fieldName]}
            value={step.data[EmailRiskFieldTypes[fieldName]]}
            key={EmailRiskFieldTypes[fieldName]}
            style={styles.stepDetailsItem}
          />
        ))}
      </View>
    </View>
  );
}

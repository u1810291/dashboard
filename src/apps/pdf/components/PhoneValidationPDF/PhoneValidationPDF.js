import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { PhoneValidationFields } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { styles } from './PhoneValidationPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';
import { CheckStepDetailsEntryPDF } from '../CheckStepPDF/CheckStepDetailsEntryPDF';

export function PhoneValidationPDF({ stepData = {} }) {
  const intl = useIntl();
  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[stepData.statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'SecurityCheckStep.phoneOwnership.title' })}
        </Text>
      </View>
      {stepData.error && (
        <View>
          <Text>
            {intl.formatMessage({ id: `SecurityCheckStep.${stepData.error.code}` })}
          </Text>
        </View>
      )}
      <View style={styles.stepDetailsContainer}>
        {PhoneValidationFields.map((fieldName) => (stepData?.data[fieldName] !== undefined && stepData?.data[fieldName] !== null) && (
          <CheckStepDetailsEntryPDF label={fieldName} value={stepData.data[fieldName]} key={fieldName} style={styles.stepDetailsItem} />
        ),
        )}
      </View>
    </View>
  );
}

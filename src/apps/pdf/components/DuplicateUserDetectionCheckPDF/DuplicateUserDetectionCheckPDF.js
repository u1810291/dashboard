import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles } from './DuplicateUserDetectionCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { getStepStatus } from '../../../../models/Step.model';
import { IconStatuses } from '../../assets';

export function DuplicateUserDetectionCheckPDF({ stepData = {} }) {
  const intl = useIntl();
  const statusCode = getStepStatus(stepData);

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.title` })}
        </Text>
      </View>
      <Text style={styles.value}>
        {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.description` })}
      </Text>
      {stepData?.data?.duplicateIdentities && (
        <View style={styles.linkWrapper}>
          {stepData.data.duplicateIdentities.map((entry, index) => (
            <Text style={styles.link}>
              {`${intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLinks' })} ${index + 1}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

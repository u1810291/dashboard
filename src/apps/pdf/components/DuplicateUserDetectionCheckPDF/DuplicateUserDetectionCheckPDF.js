import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { useIntl } from 'react-intl';
import { IconStatuses } from '../../assets';
import { commonStyles } from '../../PDF.styles';
import { styles } from './DuplicateUserDetectionCheckPDF.styles';

export function DuplicateUserDetectionCheckPDF({ stepData = {} }) {
  const intl = useIntl();

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[stepData.checkStatus]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.title` })}
        </Text>
      </View>
      <Text style={styles.value}>
        {intl.formatMessage({ id: `Checks.result.DuplicateUserDetectionCheck.${stepData.checkStatus}.description` })}
      </Text>
      {stepData?.data?.duplicateIdentities && (
        <View style={styles.linkWrapper}>
          {stepData.data.duplicateIdentities.map((_, index) => (
            <Text style={styles.link}>
              {`${intl.formatMessage({ id: 'Checks.result.DuplicateUserDetectionCheck.duplicatationLinks' })} ${index + 1}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

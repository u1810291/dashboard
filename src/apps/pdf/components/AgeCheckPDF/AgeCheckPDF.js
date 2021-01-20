import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles } from './AgeCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';

export function AgeCheckPDF({ stepData = {} }) {
  const intl = useIntl();
  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[stepData.checkStatus]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: `Checks.result.ageCheck.${stepData.checkStatus}.title` })}
        </Text>
      </View>
      <Text style={styles.value}>
        {intl.formatMessage({ id: `Checks.result.ageCheck.${stepData.checkStatus}.description` },
          { threshold: stepData?.data?.ageThreshold },
        )}
      </Text>
    </View>
  );
}

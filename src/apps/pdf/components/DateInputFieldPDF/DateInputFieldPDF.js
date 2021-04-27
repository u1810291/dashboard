import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';
import { styles } from './DateInputFieldPDF.styles';

export function DateInputFieldPDF({ dateString }) {
  const intl = useIntl();

  const date = dateString ? dateString.split('-') : [];
  const selectValues = {
    day: date[2] || '-',
    month: date[1] || '-',
    year: date[0] || '-',
  };

  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <Text style={[styles.label, commonStyles.mb05]}>
          {intl.formatMessage({ id: 'DocumentReadingStep.Day' })}
        </Text>
        <Text style={styles.label}>{selectValues.day}</Text>
      </View>
      <View style={styles.control}>
        <Text style={[styles.label, commonStyles.mb05]}>
          {intl.formatMessage({ id: 'DocumentReadingStep.Month' })}
        </Text>
        <Text style={styles.label}>{selectValues.month}</Text>
      </View>
      <View style={styles.control}>
        <Text style={[styles.label, commonStyles.mb05]}>
          {intl.formatMessage({ id: 'DocumentReadingStep.Year' })}
        </Text>
        <Text style={styles.label}>{selectValues.year}</Text>
      </View>
    </View>
  );
}

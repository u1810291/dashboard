import React from 'react';
import { useFormattedValue } from 'lib/string';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './CheckStepPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function CheckStepDetailsEntryPDF({ label, value, style }) {
  const intl = useIntl();
  const formatted = useFormattedValue(label, value);

  return (
    <View key={label} style={[styles.card, commonStyles.mb05, style]}>
      <Text style={styles.valueEntrySuccess}>{formatted}</Text>
      <Text style={commonStyles.title}>
        {intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: label,
        })}
      </Text>
    </View>
  );
}

import React from 'react';
import { useFormattedValue } from 'lib/formatValue.hook';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './CheckStepPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function CheckStepDetailsEntryPDF({ label, value, style, isMarkedAsFailed }: {
  label: string;
  value: any;
  style?: any;
  isMarkedAsFailed?: boolean;
}) {
  const intl = useIntl();
  const formatted = useFormattedValue(label, value);

  return (
    <View key={label} style={[styles.card, commonStyles.mb05, style]}>
      <Text style={isMarkedAsFailed ? style.valueEntryFailed : styles.valueEntrySuccess}>{formatted}</Text>
      <Text style={commonStyles.title}>
        {intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: label,
        })}
      </Text>
    </View>
  );
}

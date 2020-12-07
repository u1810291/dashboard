import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View, Image } from '@react-pdf/renderer';
import { Statuses, styles } from './CheckResultLogoPDF.styles';

export function CheckResultLogoPDF({ status, type = 'document' }) {
  const intl = useIntl();
  const { icon, color } = Statuses[status][type];

  return (
    <View style={styles.result}>
      <Image style={styles.image} src={icon} />
      <Text style={[styles.resultTitle, { color }]}>
        {intl.formatMessage({ id: `Checks.result.${type}.${status}.title` })}
      </Text>
      <Text style={styles.resultText}>
        {intl.formatMessage({ id: `Checks.result.${type}.${status}.description` })}
      </Text>
    </View>
  );
}

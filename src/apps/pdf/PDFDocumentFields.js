import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import { styles } from './PDF.styles';

export function PDFDocumentFields({ intl, fields }) {
  return fields.map(({ id, label, value }) => (
    <View key={id} style={styles.row}>
      <Text style={styles.label}>
        {intl.formatMessage({ id: `identity.field.${id}`, defaultMessage: label })}
      </Text>
      {value
        ? <Text style={styles.value}>{value}</Text>
        : <Text style={[styles.value, styles.grey]}>{intl.formatMessage({ id: 'DocumentReadingStep.notParsed' })}</Text>}
    </View>
  ));
}

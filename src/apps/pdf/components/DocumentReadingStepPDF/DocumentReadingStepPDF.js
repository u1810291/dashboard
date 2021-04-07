import React from 'react';
import { useIntl } from 'react-intl';
import { humanize, underscore } from 'inflection';
import { formatValue } from 'lib/string';
import { Image, Text, View } from '@react-pdf/renderer';
import DocumentUndefined from '../../assets/icon-document-undefined.png';
import { styles } from './DocumentReadingStepPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function DocumentReadingStepPDF({ step, fields = [], onReading }) {
  const intl = useIntl();

  if (step.error) {
    return (
      <View style={styles.result}>
        <Image style={styles.image} src={DocumentUndefined} />
        <Text style={styles.resultTitle}>
          {intl.formatMessage({ id: 'DocumentReadingStep.error' })}
        </Text>
      </View>
    );
  }

  if (onReading) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {fields.map(({ id, value }) => {
        const valueLabel = intl.formatMessage({
          id: `identity.field.${id}`,
          defaultMessage: humanize(underscore(id)),
        });
        const formattedValue = formatValue(id, value);

        return (
          <View style={styles.inputWrapper} key={id}>
            <View style={commonStyles.mb05}>
              {formattedValue ? (
                <Text style={styles.text}>{formattedValue}</Text>
              ) : (
                <Text style={styles.textError}>
                  {intl.formatMessage({ id: 'DocumentReadingStep.notParsed' })}
                </Text>
              )}
            </View>
            <Text style={commonStyles.title}>
              {valueLabel}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

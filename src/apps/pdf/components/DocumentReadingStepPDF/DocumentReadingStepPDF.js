import React from 'react';
import { useIntl } from 'react-intl';
import { humanize, underscore } from 'inflection';
import { formatValue } from 'lib/string';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './DocumentReadingStepPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function DocumentReadingStepPDF({ step, fields = [], onReading }) {
  const intl = useIntl();

  if (step.error) {
    const message = intl.formatMessage({ id: 'DocumentReadingStep.error' }, {
      message: <Text style={styles.textError}>{step.error.message}</Text>,
    });
    return (
      <Text>{message}</Text>
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

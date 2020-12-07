import { useIntl } from 'react-intl';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';
import { DateFormat, utcToLocalFormat } from '../../../../lib/date';

export function VerificationDateAndNumberPDF({ date, number }) {
  const intl = useIntl();

  return (
    <>
      <View style={commonStyles.mb15}>
        <Text style={commonStyles.data}>
          {utcToLocalFormat(date, DateFormat.DateTime)}
        </Text>
        <Text style={commonStyles.title}>
          {intl.formatMessage({ id: 'identity.summary.date' })}
        </Text>
      </View>
      <View>
        <Text style={commonStyles.data}>
          {number}
        </Text>
        <Text style={commonStyles.title}>
          {intl.formatMessage({ id: 'identity.summary.number' })}
        </Text>
      </View>
    </>
  );
}

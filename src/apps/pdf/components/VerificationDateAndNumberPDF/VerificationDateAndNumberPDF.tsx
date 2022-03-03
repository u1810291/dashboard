import { useIntl } from 'react-intl';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { commonStyles } from '../../PDF.styles';

export function VerificationDateAndNumberPDF({ date, number }: {
  date: string;
  number: string;
}) {
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

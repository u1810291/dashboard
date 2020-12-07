import { useIntl } from 'react-intl';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';

export function VerificationSourcePDF({ platformType }) {
  const intl = useIntl();

  return (
    <View style={commonStyles.mb15}>
      <Text style={commonStyles.data}>
        {intl.formatMessage({ id: `identity.summary.source.${platformType}` })}
      </Text>
      <Text style={commonStyles.title}>
        {intl.formatMessage({ id: 'identity.summary.source.title' })}
      </Text>
    </View>
  );
}

import { useIntl } from 'react-intl';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';

export function VerificationFlowPDF({ flowId }) {
  const intl = useIntl();

  return (
    <View style={commonStyles.mb15}>
      <Text style={commonStyles.data}>
        {flowId}
      </Text>
      <Text style={commonStyles.title}>
        {intl.formatMessage({ id: 'identity.summary.flow' })}
      </Text>
    </View>
  );
}

import React from 'react';
import { useIntl } from 'react-intl';
import stringify from 'lib/stringify';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';

export function VerificationMetadataPDF({ metadata = {} }) {
  const intl = useIntl();

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'VerificationMetadata.title' })}
      </Text>
      <Text style={commonStyles.code}>
        {stringify(metadata)}
      </Text>
    </View>
  );
}

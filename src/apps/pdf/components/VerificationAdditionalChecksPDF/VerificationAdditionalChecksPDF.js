import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';
import { DuplicateUserDetectionCheckPDF } from '../DuplicateUserDetectionCheckPDF/DuplicateUserDetectionCheckPDF';

export function VerificationAdditionalChecksPDF({ duplicateUserDetectionStep }) {
  const intl = useIntl();

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'identity.summary.title.additional' })}
      </Text>
      <DuplicateUserDetectionCheckPDF stepData={duplicateUserDetectionStep} />
    </View>
  );
}

import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';
import { DuplicateUserDetectionCheckPDF } from '../DuplicateUserDetectionCheckPDF/DuplicateUserDetectionCheckPDF';
import { AgeCheckPDF } from '../AgeCheckPDF/AgeCheckPDF';
import { PhoneValidationPDF } from '../PhoneValidationPDF/PhoneValidationPDF';

export function VerificationAdditionalChecksPDF({ duplicateUserDetectionStep, ageCheck, phoneValidation }) {
  const intl = useIntl();
  if (!ageCheck && !duplicateUserDetectionStep && !phoneValidation) { return null; }
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'identity.summary.title.additional' })}
      </Text>
      {ageCheck && <AgeCheckPDF stepData={ageCheck} />}
      {duplicateUserDetectionStep && <DuplicateUserDetectionCheckPDF stepData={duplicateUserDetectionStep} />}
      {phoneValidation && <PhoneValidationPDF stepData={phoneValidation} />}
    </View>
  );
}

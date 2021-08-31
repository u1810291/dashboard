import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';
import { DuplicateUserDetectionCheckPDF } from '../DuplicateUserDetectionCheckPDF/DuplicateUserDetectionCheckPDF';
import { EmailValidationPDF } from '../EmailValidationPDF/EmailValidationPDF';
import { AgeCheckPDF } from '../AgeCheckPDF/AgeCheckPDF';
import { PhoneValidationPDF } from '../PhoneValidationPDF/PhoneValidationPDF';
import { RiskAnalysisPDF } from '../RiskAnalysisPDF/RiskAnalysisPDF';
import { RiskEmailPDF } from '../RiskEmailPDF/RiskEmailPDF';

export function VerificationAdditionalChecksPDF({ duplicateUserDetectionStep, ageCheck, phoneValidation, riskAnalysis, emailValidationStep, emailRisk }) {
  const intl = useIntl();

  if (!ageCheck && !duplicateUserDetectionStep && !phoneValidation && !riskAnalysis && !emailValidationStep && !emailRisk) { return null; }
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'identity.summary.title.additional' })}
      </Text>
      <View style={[commonStyles.mb15]}>
        {ageCheck && <AgeCheckPDF stepData={ageCheck} />}
      </View>
      <View style={[commonStyles.mb15]}>
        {duplicateUserDetectionStep && <DuplicateUserDetectionCheckPDF stepData={duplicateUserDetectionStep} />}
      </View>
      <View style={[commonStyles.mb15]}>
        {phoneValidation && <PhoneValidationPDF step={phoneValidation} />}
      </View>
      <View style={[commonStyles.mb15]}>
        {riskAnalysis && <RiskAnalysisPDF step={riskAnalysis} />}
      </View>
      <View style={[commonStyles.mb15]}>
        {emailValidationStep && <EmailValidationPDF step={emailValidationStep} />}
      </View>
      <View style={[commonStyles.mb15]}>
        {emailRisk && <RiskEmailPDF step={emailRisk} />}
      </View>
    </View>
  );
}

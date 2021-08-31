import { Document, Page, pdf, View } from '@react-pdf/renderer';
import { StoreProvider } from 'apps/store';
import { getNom151FileContent } from 'models/Identity.model';
import React from 'react';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { getPhoneValidationExtras } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { getPhoneRiskValidationExtras } from 'apps/RiskAnalysis/models/RiskAnalysis.model';
import { getEmailVerificationExtra } from 'models/EmailValidation.model';
import { getIpCheckStep } from 'models/IpCheck.model';
import { getEmailRiskStep } from 'models/EmailCheck.model';
import { AppIntlProvider } from '../intl';
import { DocumentStepPDF } from './components/DocumentStepPDF/DocumentStepPDF';
import { IpCheckPDF } from './components/IpCheckPDF/IpCheckPDF';
import { LivenessStepPDF } from './components/LivenessStepPDF/LivenessStepPDF';
import { ReVerificationPDF } from './components/ReVerificationPDF/ReVerificationPDF';
import { Nom151CheckPDF } from './components/Nom151CheckPDF/Nom151CheckPDF';
import { VerificationAdditionalChecksPDF } from './components/VerificationAdditionalChecksPDF/VerificationAdditionalChecksPDF';
import { VerificationMetadataPDF } from './components/VerificationMetadataPDF/VerificationMetadataPDF';
import { VerificationSummaryPDF } from './components/VerificationSummaryPDF/VerificationSummaryPDF';
import { commonStyles } from './PDF.styles';

export function VerificationDocumentPDF({ verification, nom151FileContent }) {
  if (!verification) {
    return null;
  }

  const ipCheck = getIpCheckStep(verification.steps);

  return (
    <Document title={`Verification ${verification.id}`} author="Matilock, Inc. www.mati.io">
      <Page size="A4" style={commonStyles.page}>
        {/* header */}
        <View>
          <VerificationSummaryPDF identity={verification} />
        </View>
        {/* Documents */}
        {verification.documents.map((doc, index) => (
          <View key={doc.type}>
            <DocumentStepPDF
              document={doc}
              documentIndex={index}
            />
          </View>
        ))}
        {/* biometric and reVerification */}
        {verification.reVerification ? (
          <View>
            <ReVerificationPDF data={verification.reVerification} />
          </View>
        ) : (
          <View>
            <LivenessStepPDF steps={verification.biometric} />
          </View>
        )}
        {/* IP check */}
        {ipCheck && !ipCheck.error && ipCheck.data && (
          <View>
            <IpCheckPDF data={ipCheck.data} isChecking={ipCheck.status < 200} />
          </View>
        )}
        {/* Additional checks */}
        <View>
          <VerificationAdditionalChecksPDF
            duplicateUserDetectionStep={verification.duplicateUserDetectionStep}
            ageCheck={verification.ageCheck}
            phoneValidation={getPhoneValidationExtras(verification.steps.find((item) => item.id === VerificationPatternTypes.PhoneOwnershipValidation))}
            riskAnalysis={getPhoneRiskValidationExtras(verification.steps.find((item) => item.id === VerificationPatternTypes.PhoneRiskValidation))}
            emailValidationStep={getEmailVerificationExtra(verification.steps.find((item) => item.id === VerificationPatternTypes.EmailOwnershipValidation))}
            emailRisk={getEmailRiskStep(verification)}
          />
        </View>
        {/* Metadata */}
        {verification.metadata && (
          <View>
            <VerificationMetadataPDF metadata={verification.metadata} />
          </View>
        )}
        {/* digitalSignature */}
        {verification.digitalSignature && (
          <View>
            <Nom151CheckPDF data={verification.digitalSignature} nom151FileContent={nom151FileContent} />
          </View>
        )}
      </Page>
    </Document>
  );
}

export async function getIdentityDocumentBlob(verification) {
  const nom151FileContent = await getNom151FileContent(verification.digitalSignature);
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <VerificationDocumentPDF verification={verification} nom151FileContent={nom151FileContent} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}

import { Document, Page, pdf, Text, View } from '@react-pdf/renderer';
import { StoreProvider } from 'apps/store';
import { getWorkAccountData } from 'apps/WorkAccountData';
import { getBankAccountData } from 'apps/BankAccountData';
import { getPayrollAccountData } from 'apps/PayrollAccountData';
import { getNom151FileContent } from 'models/Identity.model';
import React from 'react';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { getPhoneValidationExtras } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { getPhoneRiskValidationExtras } from 'apps/RiskAnalysis/models/RiskAnalysis.model';
import { getEmailVerificationExtra } from 'models/EmailValidation.model';
import { getIpCheckStep } from 'models/IpCheck.model';
import { getEmailRiskStep } from 'models/EmailCheck.model';
import { useIntl } from 'react-intl';
import { AppIntlProvider } from 'apps/intl';
import { DocumentStepPDF } from './components/DocumentStepPDF/DocumentStepPDF';
import { IpCheckPDF } from './components/IpCheckPDF/IpCheckPDF';
import { LivenessStepPDF } from './components/LivenessStepPDF/LivenessStepPDF';
import { ReVerificationPDF } from './components/ReVerificationPDF/ReVerificationPDF';
import { Nom151CheckPDF } from './components/Nom151CheckPDF/Nom151CheckPDF';
import { VerificationAdditionalChecksPDF } from './components/VerificationAdditionalChecksPDF/VerificationAdditionalChecksPDF';
import { VerificationMetadataPDF } from './components/VerificationMetadataPDF/VerificationMetadataPDF';
import { VerificationSummaryPDF } from './components/VerificationSummaryPDF/VerificationSummaryPDF';
import { commonStyles } from './PDF.styles';
import { BankAccountDataPDF } from './components/BankAccountDataPDF/BankAccountDataPDF';
import { WorkAccountDataPDF } from './components/WorkAccountDataPDF/WorkAccountDataPDF';
import { PayrollAccountDataPDF } from './components/PayrollAccountDataPDF/PayrollAccountDataPDF';

export function VerificationDocumentPDF({ verification, nom151FileContent, additionalData }) {
  const intl = useIntl();
  if (!verification) {
    return null;
  }

  const { legalName, legalRegNumber, legalAddress } = additionalData;
  const ipCheck = getIpCheckStep(verification.steps);
  const bankAccountData = getBankAccountData(verification);
  const workAccountData = getWorkAccountData(verification);
  const payrollAccountData = getPayrollAccountData(verification);

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
            emailRisk={getEmailRiskStep(verification.steps)}
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
        {/* Financial Institutions Data */}
        {bankAccountData && (
          <View>
            <BankAccountDataPDF data={bankAccountData} />
          </View>
        )}
        {workAccountData && (
          <View>
            <WorkAccountDataPDF data={workAccountData} />
          </View>
        )}
        {payrollAccountData && (
          <View>
            <PayrollAccountDataPDF data={payrollAccountData} />
          </View>
        )}
      </Page>
      { /* footer */}
      <View style={commonStyles.footer} fixed>
        <Text>
          {intl.formatMessage({ id: 'Pdf.footer.merchantLegalInformation' },
            {
              legalName: (<Text style={commonStyles.boldText}>{legalName}</Text>),
              legalRegNumber,
              verifiedBy: (<Text style={commonStyles.boldText}>{intl.formatMessage({ id: 'Pdf.footer.matilockInc' })}</Text>),
            })}
        </Text>
        <Text>
          {intl.formatMessage({ id: 'Pdf.footer.merchantLegalAddress' }, { legalAddress })}
        </Text>
      </View>
    </Document>
  );
}

export async function getIdentityDocumentBlob(verification, additionalData) {
  const nom151FileContent = await getNom151FileContent(verification.digitalSignature);
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <VerificationDocumentPDF verification={verification} additionalData={additionalData} nom151FileContent={nom151FileContent} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}

import { Document, Page, pdf, View, Text } from '@react-pdf/renderer';
import { StoreProvider } from 'apps/store';
import { getBankAccountData } from 'apps/BankAccountData';
import { getWorkAccountData } from 'apps/WorkAccountData';
import { getPayrollAccountData } from 'apps/PayrollAccountData';
import { getNom151FileContent } from 'models/Identity.model';
import React from 'react';
import { useIntl } from 'react-intl';
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
import { BankAccountDataPDF } from './components/BankAccountDataPDF/BankAccountDataPDF';
import { WorkAccountDataPDF } from './components/WorkAccountDataPDF/WorkAccountDataPDF';
import { PayrollAccountDataPDF } from './components/PayrollAccountDataPDF/PayrollAccountDataPDF';

export function IdentityDocumentPDF({ identity, nom151FileContent, additionalData = {} }) {
  const { legalName, legalRegNumber, legalAddress } = additionalData;
  const intl = useIntl();

  if (!identity) {
    return null;
  }

  const bankAccountData = getBankAccountData(identity?._embedded?.verification);
  const workAccountData = getWorkAccountData(identity?._embedded?.verification);
  const payrollAccountData = getPayrollAccountData(identity?._embedded?.verification);

  return (
    <Document title={`Identity ${identity.id}`} author="Matilock, Inc. www.mati.io">
      <Page size="A4" style={commonStyles.page}>
        {/* header */}
        <View>
          <VerificationSummaryPDF identity={identity} />
        </View>
        {/* Documents */}
        {identity.documents.map((doc, index) => (
          <View key={doc.type}>
            <DocumentStepPDF
              document={doc}
              documentIndex={index}
            />
          </View>
        ))}
        {/* biometric and reVerification */}
        {identity.reVerification ? (
          <View>
            <ReVerificationPDF data={identity.reVerification} />
          </View>
        ) : (
          <View>
            <LivenessStepPDF steps={identity.biometric} />
          </View>
        )}
        {/* IP check */}
        {identity.ipCheck && !identity.ipCheck.error && identity.ipCheck.data && (
          <View>
            <IpCheckPDF data={identity.ipCheck.data} isChecking={identity.ipCheck.status < 200} />
          </View>
        )}
        {/* Additional checks */}
        <View>
          <VerificationAdditionalChecksPDF
            duplicateUserDetectionStep={identity.duplicateUserDetectionStep}
            ageCheck={identity.ageCheck}
            phoneValidation={identity.phoneValidation}
            riskAnalysis={identity.riskAnalysis}
            emailValidationStep={identity.emailValidationStep}
            emailRisk={identity.emailRiskStep}
          />
        </View>
        {/* Metadata */}
        {identity.metadata && (
          <View>
            <VerificationMetadataPDF metadata={identity.metadata} />
          </View>
        )}
        {/* digitalSignature */}
        {identity.digitalSignature && (
          <View>
            <Nom151CheckPDF data={identity.digitalSignature} nom151FileContent={nom151FileContent} />
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
      </Page>
    </Document>
  );
}

export async function getIdentityDocumentBlob(identity, additionalData) {
  const nom151FileContent = await getNom151FileContent(identity.digitalSignature);
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <IdentityDocumentPDF identity={identity} additionalData={additionalData} nom151FileContent={nom151FileContent} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}

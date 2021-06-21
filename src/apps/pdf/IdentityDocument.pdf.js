import { Document, Page, pdf, View } from '@react-pdf/renderer';
import { StoreProvider } from 'apps/store';
import { getNom151FileContent } from 'models/Identity.model';
import React from 'react';
import { AppIntlProvider } from '../intl';
import { DocumentStepPDF } from './components/DocumentStepPDF/DocumentStepPDF';
import { IpCheckPDF } from './components/IpCheckPDF/IpCheckPDF';
import { LivenessStepPDF } from './components/LivenessStepPDF/LivenessStepPDF';
import { Nom151CheckPDF } from './components/Nom151CheckPDF/Nom151CheckPDF';
import { VerificationAdditionalChecksPDF } from './components/VerificationAdditionalChecksPDF/VerificationAdditionalChecksPDF';
import { VerificationMetadataPDF } from './components/VerificationMetadataPDF/VerificationMetadataPDF';
import { VerificationSummaryPDF } from './components/VerificationSummaryPDF/VerificationSummaryPDF';
import { commonStyles } from './PDF.styles';

export function IdentityDocumentPDF({ identity, nom151FileContent }) {
  if (!identity) {
    return null;
  }

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
        {/* biometric */}
        <View>
          <LivenessStepPDF steps={identity.biometric} />
        </View>
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
      </Page>
    </Document>
  );
}

export async function getIdentityDocumentBlob(identity) {
  const nom151FileContent = await getNom151FileContent(identity.digitalSignature);
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <IdentityDocumentPDF identity={identity} nom151FileContent={nom151FileContent} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}

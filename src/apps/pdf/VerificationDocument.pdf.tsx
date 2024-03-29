import { Document, Page, pdf, Text, View } from '@react-pdf/renderer';
import { StoreProvider } from 'apps/store';
import { getWorkAccountData } from 'apps/WorkAccountData';
import { getBankAccountData } from 'apps/BankAccountData';
import { getPayrollAccountData } from 'apps/PayrollAccountData';
import { getNom151FileContent } from 'models/Identity.model';
import { VerificationResponse, VerificationWithExtras } from 'models/VerificationOld.model';
import React from 'react';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { getPhoneValidationExtras } from 'apps/PhoneValidation/models/PhoneValidation.model';
import { getPhoneRiskValidationExtras } from 'apps/RiskAnalysis/models/RiskAnalysis.model';
import { getEmailVerificationExtra } from 'models/EmailValidation.model';
import { getEmailRiskStep } from 'models/EmailCheck.model';
import { useIntl } from 'react-intl';
import { AppIntlProvider } from 'apps/intl';
import { getGovCheckRootSteps } from 'apps/GovCheck';
import { getDataForVerificationComponent } from 'models/CustomField.model';
import { DocumentStepPDF } from './components/DocumentStepPDF/DocumentStepPDF';
import { LocationIntelligenceOldPDF } from './components/LocationIntelligenceOldPDF/LocationIntelligenceOldPDF';
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
import { CheckStepPDF } from './components/CheckStepPDF/CheckStepPDF';
import { GovCheckTextPDF } from './components/GovCheckTextPDF/GovCheckTextPDF';
import { CustomFieldPDF } from './components/CustomFieldPDF/CustomFieldPDF';
import { CustomWatchlistPDF } from './components/CustomWatchlistPDF/CustomWatchlistPDF';
import { BasicWatchlistPDF } from './components/BasicWatchlistPDF/BasicWatchlistPDF';
import { CreditCheckPDF } from './components/CreditCheckPDF/CreditCheckPDF';
import { ESignaturePDF } from './components/ESignaturePDF/ESignaturePDF';
import { getLocationIntelligenceStep } from '../LocationIntelligenceOld';

interface AdditionalData {
  legalName: string;
  legalRegNumber: number;
  legalAddress: string;
}

export function VerificationDocumentPDF({ verification, nom151FileContent, additionalData }: {
  verification: VerificationResponse;
  nom151FileContent: string;
  additionalData: AdditionalData;
}) {
  const intl = useIntl();
  if (!verification) {
    return null;
  }

  const { legalName, legalRegNumber, legalAddress } = additionalData;
  const LocationIntelligence = getLocationIntelligenceStep(verification.steps);
  const bankAccountData = getBankAccountData(verification);
  const workAccountData = getWorkAccountData(verification);
  const payrollAccountData = getPayrollAccountData(verification);
  const govCheckRootSteps = getGovCheckRootSteps(verification);
  const customFieldData = getDataForVerificationComponent(verification);

  return (
    <Document title={`Verification ${verification.id}`} author="MetaMap www.metamap.com">
      <Page size="A4" style={commonStyles.page}>
        {/* header */}
        <View>
          <VerificationSummaryPDF identity={verification as VerificationWithExtras} />
        </View>
        {/* Custom Field */}
        {customFieldData && (
          <View style={[commonStyles.mb15]}>
            <CustomFieldPDF customFieldData={customFieldData} />
          </View>
        )}
        {/* Documents */}
        {verification.documents.map((doc, index) => (
          <View key={doc.type}>
            <DocumentStepPDF
              document={doc}
              documentIndex={index}
            />
          </View>
        ))}
        {/* GovCheck from root step */}
        {govCheckRootSteps?.map((step) => (
          <CheckStepPDF step={step} title={step.title} key={step.id}>
            <GovCheckTextPDF step={step} isShowError={step.isShowError} />
          </CheckStepPDF>
        ))}
        {/* custom watchlist */}
        <CustomWatchlistPDF steps={verification.steps} />
        {/* basic watchlist */}
        <BasicWatchlistPDF steps={verification.steps} />
        {/* credit check */}
        <CreditCheckPDF />
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
        {LocationIntelligence && LocationIntelligence.data && (
          <View>
            <LocationIntelligenceOldPDF data={LocationIntelligence.data} />
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
        {/* esignature check */}
        <ESignaturePDF steps={verification.steps} />
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

export async function getVerificationDocumentBlob(verification, additionalData) {
  const nom151FileContent = await getNom151FileContent(verification.digitalSignature);
  return pdf(
    <StoreProvider>
      <AppIntlProvider>
        <VerificationDocumentPDF verification={verification} additionalData={additionalData} nom151FileContent={nom151FileContent} />
      </AppIntlProvider>
    </StoreProvider>,
  ).toBlob();
}

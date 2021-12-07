import { Box, Grid, Paper } from '@material-ui/core';
import { getBankAccountData } from 'apps/BankAccountData';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { VerificationBankAccountDataCheck } from 'apps/checks/components/VerificationBankAccountkDataCheck/VerificationBankAccountDataCheck';
import { VerificationWorkAccountDataCheck } from 'apps/checks/components/VerificationWorkAccountDataCheck/VerificationWorkAccountDataCheck';
import { VerificationPayrollAccountDataCheck } from 'apps/checks/components/VerificationPayrollAccountDataCheck/VerificationPayrollAccountDataCheck';
import { Page404 } from 'apps/layout';
import { getWorkAccountData } from 'apps/WorkAccountData';
import { getPayrollAccountData } from 'apps/PayrollAccountData';
import { getDownloadableFileName } from 'models/Identity.model';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VerificationAdditionalChecks } from 'apps/checks/components/VerificationAdditionalChecks/VerificationAdditionalChecks';
import { LivenessStep } from 'apps/biometrics';
import { DocumentStep } from 'apps/documents';
import { VerificationMetadata } from 'apps/metadata';
import { selectReviewVerificationWithExtras, selectDataForCreditCheck } from 'apps/Verification';
import { ESignature } from 'apps/ESignature/components/ESignature/ESignature';
import { verificationDocumentUpdate } from 'state/identities/identities.actions';
import { CustomDocumentVerification } from 'apps/customDocument/components/CustomDocumentVerification/CustomDocumentVerification';
import { CUSTOM_DOCUMENT_PREFIX } from 'apps/customDocument/models/customDocument.model';
import { Nom151Check } from 'apps/CertifiedTimestamp';
import { CreditCheckVerificationProduct } from 'apps/CreditCheck';
import { useDocsWithPrivateMedia, useBiometricsWithPrivateMedia } from 'apps/media';
import { Routes } from 'models/Router.model';
import { VerificationSummary } from '../../components/VerificationSummary/VerificationSummary';

export function Verification({ identity }) {
  const dispatch = useDispatch();
  const verification = useSelector(selectReviewVerificationWithExtras);
  const creditDocumentStep = useSelector(selectDataForCreditCheck).creditDocumentStep;
  const documentsWithPrivateMedia = useDocsWithPrivateMedia(verification?.documents, Routes.list.root);
  const biometricsWithPrivateMedia = useBiometricsWithPrivateMedia(verification?.biometric);
  const verificationWithPrivateMedia = useMemo(() => ({ ...verification, documents: documentsWithPrivateMedia, biometric: biometricsWithPrivateMedia }), [biometricsWithPrivateMedia, documentsWithPrivateMedia, verification]);
  const identityWithPrivateMedia = useMemo(() => ({ ...identity, documents: documentsWithPrivateMedia, biometric: biometricsWithPrivateMedia }), [biometricsWithPrivateMedia, documentsWithPrivateMedia, identity]);
  const downloadableFileName = getDownloadableFileName(verification);
  const documents = useMemo(() => verificationWithPrivateMedia.documents?.filter((doc) => !doc?.type.includes(CUSTOM_DOCUMENT_PREFIX)), [verificationWithPrivateMedia.documents]);
  const customDocuments = useMemo(() => verificationWithPrivateMedia.documents?.filter((doc) => doc?.type.includes(CUSTOM_DOCUMENT_PREFIX)), [verificationWithPrivateMedia.documents]);
  const bankAccountData = useMemo(() => getBankAccountData(verification), [verification]);
  const workAccountData = useMemo(() => getWorkAccountData(verification), [verification]);
  const payrollAccountData = useMemo(() => getPayrollAccountData(verification), [verification]);

  const handleDocumentUpdate = useCallback((documentType) => async (normalizedData) => {
    if (documentType && normalizedData) {
      await dispatch(verificationDocumentUpdate(verification.id, documentType, normalizedData));
    }
  }, [dispatch, verification.id]);

  if (!(verification)) {
    return <Page404 />;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {/* header */}
      <Grid item>
        {documentsWithPrivateMedia && (<VerificationSummary identity={identityWithPrivateMedia} />)}
      </Grid>

      {/* biometric */}
      <Grid item>
        <LivenessStep steps={identityWithPrivateMedia.biometric} downloadableFileName={downloadableFileName} />
      </Grid>

      {/* Documents */}
      {documents?.map((doc, index) => (
        <Grid item key={doc.type}>
          <DocumentStep
            onDocumentUpdate={handleDocumentUpdate(documents[index]?.type)}
            identity={identity}
            document={doc}
            documentIndex={index}
          />
        </Grid>
      ))}

      {/* Custom Documents */}
      {customDocuments && (
        customDocuments.map((doc) => (
          <Grid item key={doc.type}>
            <CustomDocumentVerification
              onDocumentUpdate={handleDocumentUpdate(doc.type)}
              identity={identity}
              document={doc}
            />
          </Grid>
        ))
      )}

      {/* IP check */}
      {identity.ipCheck && (
        <Grid item>
          <IpCheck step={identity.ipCheck} />
        </Grid>
      )}

      {/* Credit check */}
      {creditDocumentStep && (
        <Grid item>
          <Paper>
            <Box p={2}>
              <CreditCheckVerificationProduct />
            </Box>
          </Paper>
        </Grid>
      )}

      {/* Additional checks */}
      <Grid item>
        <VerificationAdditionalChecks
          duplicateUserDetectionStep={identity.duplicateUserDetectionStep}
          ageCheck={identity.ageCheck}
          phoneValidation={identity.phoneValidation}
          riskAnalysis={identity.riskAnalysis}
          emailValidationStep={identity.emailValidationStep}
          emailRiskStep={identity.emailRiskStep}
        />
      </Grid>

      {/* Metadata */}
      {identity.metadata && (
        <Grid item>
          <VerificationMetadata metadata={identity.metadata} />
        </Grid>
      )}

      {/* digitalSignature */}
      {identity.digitalSignature && (
        <Grid item>
          <Paper>
            <Nom151Check data={identity.digitalSignature} />
          </Paper>
        </Grid>
      )}
      {identity.eSignature && (
        <Grid item>
          <ESignature step={identity.eSignature} />
        </Grid>
      )}
      {/* Financial Institutions checks */}
      {bankAccountData && (
        <Grid item>
          <VerificationBankAccountDataCheck data={bankAccountData} />
        </Grid>
      )}
      {workAccountData && (
        <Grid item>
          <VerificationWorkAccountDataCheck data={workAccountData} />
        </Grid>
      )}
      {payrollAccountData && (
        <Grid item>
          <VerificationPayrollAccountDataCheck data={payrollAccountData} />
        </Grid>
      )}
    </Grid>
  );
}

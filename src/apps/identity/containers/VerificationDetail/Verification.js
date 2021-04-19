import { Grid } from '@material-ui/core';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { Nom151Check } from 'apps/checks/components/Nom151Check/Nom151Check';
import { Page404 } from 'apps/layout';
import { getDownloadableFileName } from 'models/Identity.model';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { documentUpdate } from 'state/identities/identities.actions';
import { selectReviewVerificationWithExtras } from 'state/verification/verification.selectors';
import { LivenessStep } from '../../../biometrics';
import { VerificationAdditionalChecks } from '../../../checks/components/VerificationAdditionalChecks/VerificationAdditionalChecks';
import { DocumentStep } from '../../../documents';
import { VerificationMetadata } from '../../components/VerificationMetadata/VerificationMetadata';
import { VerificationSummary } from '../../components/VerificationSummary/VerificationSummary';

export function Verification({ identity }) {
  const dispatch = useDispatch();
  const verification = useSelector(selectReviewVerificationWithExtras);
  const downloadableFileName = getDownloadableFileName(verification);

  const handleDocumentUpdate = useCallback((documentId) => async (normalizedData) => {
    if (documentId && normalizedData) {
      await dispatch(documentUpdate(documentId, normalizedData));
    }
  }, [dispatch]);

  if (!(verification)) {
    return <Page404 />;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {/* header */}
      <Grid item>
        <VerificationSummary identity={identity} />
      </Grid>

      {/* biometric */}
      <Grid item>
        <LivenessStep steps={identity.biometric} downloadableFileName={downloadableFileName} />
      </Grid>

      {/* Documents */}
      {verification.documents.map((doc, index) => (
        <Grid item key={doc.type}>
          <DocumentStep
            onDocumentUpdate={handleDocumentUpdate(identity.documents[index]?.source?.id)}
            identity={identity}
            document={doc}
            documentIndex={index}
          />
        </Grid>
      ))}

      {/* IP check */}
      {identity.ipCheck && !identity.ipCheck.error && identity.ipCheck.data && (
        <Grid item>
          <IpCheck data={identity.ipCheck.data} isChecking={identity.ipCheck.status < 200} />
        </Grid>
      )}

      {/* Additional checks */}
      <Grid item>
        <VerificationAdditionalChecks
          duplicateUserDetectionStep={identity.duplicateUserDetectionStep}
          ageCheck={identity.ageCheck}
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
          <Nom151Check data={identity.digitalSignature} />
        </Grid>
      )}

    </Grid>
  );
}

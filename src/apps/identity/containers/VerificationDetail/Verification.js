import { Grid } from '@material-ui/core';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { Nom151Check } from 'apps/checks/components/Nom151Check/Nom151Check';
import { Page404 } from 'apps/layout';
import { get } from 'lodash';
import React from 'react';
import { DocumentStep } from '../../components/DocumentStep/DocumentStep';
import { LivenessStep } from '../../components/LivenessStep/LivenessStep';
import { VerificationMetadata } from '../../components/VerificationMetadata/VerificationMetadata';
import { VerificationSummary } from '../../components/VerificationSummary/VerificationSummary';
import { getDownloadableFileName } from '../../../../models/Identity.model';
import { VerificationAdditionalChecks } from '../../components/VerificationAdditionalChecks/VerificationAdditionalChecks';

export function Verification({ identity }) {
  const verification = get(identity, '_embedded.verification');
  const downloadableFileName = getDownloadableFileName(identity);

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
      {identity.documents.map((doc, index) => (
        <Grid item key={doc.type}>
          <DocumentStep
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
      {identity.duplicateUserCheck && (
        <Grid item>
          <VerificationAdditionalChecks duplicateUserDetectionStep={identity.duplicateUserCheck} />
        </Grid>
      )}

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

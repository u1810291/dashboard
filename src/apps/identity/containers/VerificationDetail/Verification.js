import { Card, CardContent, Grid } from '@material-ui/core';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { Page404 } from 'apps/layout';
import { get } from 'lodash';
import { getIpCheckStep } from 'models/IpCheck.model';
import React from 'react';
import { DocumentStep } from '../../components/DocumentStep';
import { LivenessStep } from '../../components/LivenessStep';
import { VerificationMetadata } from '../../components/VerificationMetadata/VerificationMetadata';
import { Header } from './Header';

export function Verification({ identity }) {
  const verification = get(identity, '_embedded.verification');
  const ipCheck = getIpCheckStep(identity);

  if (!(verification)) {
    return <Page404 />;
  }

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {/* header */}
      <Grid item>
        <Card>
          <CardContent>
            <Header fullName={identity.fullName} dateCreated={identity.dateCreated} />
          </CardContent>
        </Card>
      </Grid>

      {/* IP check */}
      {ipCheck && !ipCheck.error && (
        <Grid item>
          <IpCheck data={ipCheck.data} />
        </Grid>
      )}

      {/* Liveness */}
      {identity.liveness && (
        <Grid item>
          <LivenessStep liveness={identity.liveness} />
        </Grid>
      )}

      {/* Documents */}
      {identity.documents.map((doc) => (
        <Grid item key={doc.type}>
          <DocumentStep
            isIdentityEditable={identity.isEditable}
            document={doc}
          />
        </Grid>
      ))}

      {/* Metadata */}
      {identity.metadata && (
        <Grid item>
          <VerificationMetadata metadata={identity.metadata} />
        </Grid>
      )}

    </Grid>
  );
}

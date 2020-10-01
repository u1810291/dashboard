import { Card, CardContent, Grid } from '@material-ui/core';
import { IpCheck } from 'apps/checks/components/IpCheck/IpCheck';
import { Page404 } from 'apps/layout';
import { get } from 'lodash';
import React from 'react';
import { DocumentStep } from '../../components/DocumentStep/DocumentStep';
import { LivenessStep } from '../../components/LivenessStep/LivenessStep';
import { VerificationMetadata } from '../../components/VerificationMetadata/VerificationMetadata';
import { Header } from './Header';

export function Verification({ identity }) {
  const verification = get(identity, '_embedded.verification');

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
      {identity.ipCheck && !identity.ipCheck.error && (
        <Grid item>
          <IpCheck data={identity.ipCheck.data} />
        </Grid>
      )}

      {/* biometric */}
      {identity.biometric.length > 0 && (
        <Grid item>
          <LivenessStep steps={identity.biometric} />
        </Grid>
      )}

      {/* Documents */}
      {identity.documents.map((doc) => (
        <Grid item key={doc.type}>
          <DocumentStep
            identity={identity}
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

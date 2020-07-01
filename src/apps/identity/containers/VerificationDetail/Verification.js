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


  if (!(verification)) {
    return <Page404 />;
  }

  const documentsSources = get(identity, '_embedded.documents');
  const { extras } = identity;
  const ipCheck = getIpCheckStep(identity);

  return (
    <Grid container spacing={2} direction="column" wrap="nowrap">
      {/* header */}
      <Grid item>
        <Card>
          <CardContent>
            <Header fullName={extras.fullName} dateCreated={extras.dateCreated} />
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
      {extras.liveness && (
        <Grid item>
          <LivenessStep liveness={extras.liveness} />
        </Grid>
      )}

      {/* Documents */}
      {verification.documents.map((doc) => (
        <Grid item key={doc.type}>
          <DocumentStep
            isIdentityEditable={extras.isEditable}
            document={doc}
            extras={extras}
            source={documentsSources}
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

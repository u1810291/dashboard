import { get } from 'lodash';
import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Page404 } from 'apps/layout';
import { getIdentityExtras } from 'models/Identity.model';
import { Header } from './Header';
import { LivenessStep } from '../../components/LivenessStep';
import { VerificationMetadata } from '../../components/VerificationMetadata/VerificationMetadata';
import { DocumentStep } from '../../components/DocumentStep';

export function Verification({ identity }) {
  const verification = get(identity, '_embedded.verification');

  if (!(verification)) {
    return <Page404 />;
  }

  const documentsSources = get(identity, '_embedded.documents');
  const extras = getIdentityExtras(identity);

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

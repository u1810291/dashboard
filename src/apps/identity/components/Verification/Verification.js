import { Card, CardContent, Grid } from '@material-ui/core';
import { Header } from 'apps/identity/containers/VerificationDetail/Header';
import { NotFound } from 'apps/not-found';
import { DocumentStep } from 'fragments/verifications/document-step';
import { LivenessStep } from 'fragments/verifications/liveness-step';
import MatiChecks from 'fragments/verifications/mati-checks/MatiChecks';
import VerificationMetadata from 'fragments/verifications/verification-metadata/VerificationMetadata';
import { get } from 'lodash';
import { getIdentityExtras } from 'models/Identity.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCountriesList } from 'state/countries/countries.selectors';

export function Verification({ identity }) {
  const countriesList = useSelector(selectCountriesList);
  const verification = get(identity, '_embedded.verification');

  if (!(verification)) {
    return <NotFound />;
  }

  const documentsSources = get(identity, '_embedded.documents');
  const extras = getIdentityExtras(identity);

  return (
    <Grid container spacing={2} direction="column">
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
            countries={countriesList}
          />
        </Grid>
      ))}

      {/* Metadata */}
      {identity.metadata && (
        <Grid item>
          <VerificationMetadata metadata={identity.metadata} />
        </Grid>
      )}

      <Grid item>
        <MatiChecks />
      </Grid>
    </Grid>
  );
}

import { Box, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useDocumentTitle } from 'apps/identity/hooks/document.hook';
import { WarningTypes, Warning } from 'apps/ui';
import classNames from 'classnames';
import { isDateExpired } from 'lib/date';
import { DocumentCountrySanctionList } from 'models/Document.model';
import { FieldsExpiredCheck } from 'models/Field.model';
import { DocumentMxSteps, DocumentSecuritySteps, DocumentStepTypes } from 'models/Step.model';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { CheckBarExpandable, CheckBarFlat } from './CheckBar';
import { DocumentReadingStep } from './DocumentReadingStep';
import { ZoomableImage } from './ZoomableImage';

export function DocumentStep({ document, identity }) {
  const intl = useIntl();
  const title = useDocumentTitle(document);

  const { steps = [], country, source, type, isEditable = true } = document;
  const [isSanctioned] = useState(DocumentCountrySanctionList.includes(country));
  const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);
  const isFormEditable = identity.isEditable && source.demo !== true && isEditable;
  const onReading = documentReadingStep.status < 200;
  const dataTitle = intl.formatMessage({ id: onReading ? 'DocumentStep.Data.titleReading' : 'DocumentStep.Data.title' });
  const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
  const mxSteps = steps.filter((step) => DocumentMxSteps.includes(step.id));

  const fields = Object.entries(source.fields || {}).map(([id, { value }]) => ({
    id,
    value,
    isValid: FieldsExpiredCheck.includes(id) ? !isDateExpired(value, identity.dateCreated) : true,
  }));

  return (
    <Paper>
      <Box p={4}>
        <Typography variant="h3" gutterBottom>{title}</Typography>

        {isSanctioned && (
          <Box mt={3}>
            <Warning
              type={WarningTypes.Warning}
              label={intl.formatMessage({ id: 'SanctionCheck.title' })}
            />
          </Box>
        )}

        <Box mt={3}>
          <Divider variant="fullWidth" />
        </Box>

        <Box py={3}>
          <Grid container spacing={2}>
            {/* data */}
            <Grid item xs={7}>
              <Typography variant="h4" className={classNames({ loading: onReading })} paragraph>{dataTitle}</Typography>
              {!onReading && (
                <Box>
                  {documentReadingStep && (
                    <DocumentReadingStep
                      documentId={source.id}
                      step={documentReadingStep}
                      fields={fields}
                      isEditable={isFormEditable}
                    />
                  )}
                </Box>
              )}
            </Grid>
            {/* images */}
            <Grid item xs={5}>
              <Grid container direction="column" spacing={2}>
                {document.photos.map((photo) => (photo) && (
                  <Grid item key={photo}>
                    <ZoomableImage src={photo} alt={type} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {securityCheckSteps && (
          <>
            <Divider variant="fullWidth" />
            <Box py={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    {intl.formatMessage({ id: 'DocumentStep.Checks.title' })}
                  </Typography>
                </Grid>
                <Grid item container spacing={2}>
                  {securityCheckSteps.map((step) => (
                    <Grid item xs={12} md={6} key={step.id}>
                      <CheckBarFlat step={step} />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container>
                  {mxSteps.map((step) => (
                    <CheckBarExpandable step={step} key={step.id} />
                  ))}
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}

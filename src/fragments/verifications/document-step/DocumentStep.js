import { Box, Divider, Grid, Typography, Card, CardContent } from '@material-ui/core';
import classNames from 'classnames';
import { compact } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import DocumentReadingStep from './document-reading-step';
import { useStyles } from './DocumentStep.styles';
import { CheckListExpandable, CheckListFlat } from './security-check-collection';
import ZoomableImage from './zoomable-image';

export function DocumentStep({ document, source, countries, isIdentityEditable }) {
  const classes = useStyles();
  const intl = useIntl();

  const { steps = [], country, type, region, photos = [], isEditable = true } = document;
  const documentReadingStep = steps.find((step) => step.id === 'document-reading');
  const documentReadingSource = source.find((item) => item.type === type) || {};
  const securityCheckSteps = steps.filter((step) => [
    'template-matching',
    'alteration-detection',
    'watchlists',
    'facematch',
  ].includes(step.id));
  const mxSteps = steps.filter((step) => [
    'mexican-curp-validation',
    'mexican-ine-validation',
    'mexican-rfc-validation',
  ].includes(step.id));

  const onReading = documentReadingStep.status < 200;
  const countryName = (countries.find(({ code }) => code === country) || {}).name || country;
  const isFormEditable = isIdentityEditable && documentReadingSource.demo !== true && isEditable;

  const title = intl.formatMessage({ id: 'DocumentStep.title' }, {
    document: intl.formatMessage({ id: `flow.documentTypeStep.${type}` }),
    country: compact([countryName, region]).join(', '),
  });
  const dataTitle = intl.formatMessage({ id: onReading ? 'DocumentStep.Data.titleReading' : 'DocumentStep.Data.title' });

  return (
    <Card>
      <CardContent>
        <Box p={2}>
          <Box pb={3}>
            <Typography variant="h3" gutterBottom>{title}</Typography>
          </Box>
          <Divider variant="fullWidth" />
          <Box py={3}>
            <Grid container spacing={2}>
              {/* data */}
              <Grid item xs={7}>
                <Typography variant="h4" className={classNames({ loading: onReading })} paragraph>{dataTitle}</Typography>
                {!onReading && (
                  <Box>
                    {documentReadingStep && (
                      <DocumentReadingStep
                        documentId={documentReadingSource.id}
                        step={documentReadingStep}
                        fields={documentReadingSource.fields}
                        isEditable={isFormEditable}
                      />
                    )}
                  </Box>
                )}
              </Grid>
              {/* images */}
              <Grid item xs={5}>
                <Grid container direction="column" spacing={2} alignItems="flex-end">
                  {photos.map((photo) => photo && (
                    <Grid item key={photo} className={classes.image}>
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
                <Typography variant="h4" paragraph>{intl.formatMessage({ id: 'DocumentStep.Checks.title' })}</Typography>
                {securityCheckSteps.map((step) => (
                  <CheckListFlat step={step} key={step.id} />
                ))}
                {mxSteps.map((step) => (
                  <CheckListExpandable step={step} key={step.id} />
                ))}
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

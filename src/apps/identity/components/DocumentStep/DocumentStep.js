import { Box, Divider, Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { compact } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { DocumentReadingStep } from './DocumentReadingStep';
import { CheckBarFlat, CheckBarExpandable } from './CheckBar';
import { ZoomableImage } from './ZoomableImage';

export function DocumentStep({ document, source, countries, isIdentityEditable }) {
  const intl = useIntl();

  const { steps = [], country, type, region, photos = [], isEditable = true } = document;
  const documentReadingStep = steps.find((step) => step.id === 'document-reading');
  const documentReadingSource = source.find((item) => item.type === type) || {};
  const isFormEditable = isIdentityEditable && documentReadingSource.demo !== true && isEditable;
  const countryName = (countries.find(({ code }) => code === country) || {}).name || country;
  const onReading = documentReadingStep.status < 200;
  const dataTitle = intl.formatMessage({ id: onReading ? 'DocumentStep.Data.titleReading' : 'DocumentStep.Data.title' });
  const title = intl.formatMessage({ id: 'DocumentStep.title' }, {
    document: intl.formatMessage({ id: `flow.documentTypeStep.${type}` }),
    country: compact([countryName, region]).join(', '),
  });

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

  return (
    <Paper>
      <Box p={4}>
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
              <Grid container direction="column" spacing={2}>
                {photos.map((photo) => (photo) && (
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
                    <CheckBarFlat step={step} key={step.id} />
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

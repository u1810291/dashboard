import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks';
import { PremiumAmlWatchlistsStepDetails } from 'apps/identity/components/PremiumAmlWatchlistsStepDetails/PremiumAmlWatchlistsStepDetails';
import { useDocumentTitle, usePhotosOrientation } from 'apps/identity/hooks/document.hook';
import { POOImage } from 'apps/ProofOfOwnership';
import { CheckBarExpandable, CheckResultLogo, Warning, WarningTypes, ZoomableImage } from 'apps/ui';
import classNames from 'classnames';

import { DocumentSides, getDocumentSideLabel, PhotosOrientations } from 'models/Document.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { DocumentReadingStep } from '../DocumentReadingStep/DocumentReadingStep';
import { useStyles } from './DocumentStep.styles';

export function DocumentStep({ document, identity, documentIndex, onDocumentUpdate }) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const photosOrientation = usePhotosOrientation(document);

  const { type, isEditable = true, securityCheckSteps, documentFailedCheckSteps, govChecksSteps, isSanctioned, premiumAmlWatchlistsStep, fields, documentReadingStep, onReading, documentStatus, proofOfOwnership, photos, areTwoSides } = document;
  const isFormEditable = identity.isEditable && isEditable;
  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.title} variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'DocumentStep.Data.title' }, { index: documentIndex + 1 })}</Typography>
          <Grid container>
            <Typography className={classes.title} variant="subtitle2">{intl.formatMessage({ id: 'DocumentStep.Data.subtitle' })}</Typography>
            &nbsp;
            <Typography className={classes.title} variant="body1">{title}</Typography>
          </Grid>
        </Box>

        {isSanctioned && (
          <Box mb={2}>
            <Warning
              type={WarningTypes.Error}
              label={intl.formatMessage({ id: 'SanctionCheck.title' })}
            />
          </Box>
        )}

        <Grid container className={classes.wrapper}>
          {/* images */}
          <Grid item xs={12} lg={4} className={classes.imagesWrapper}>
            <Grid container direction="column" alignItems="center" className={classes.images}>
              <Grid
                container
                justify="center"
                className={classNames({
                  [classes.imagesHorizontal]: areTwoSides && photosOrientation === PhotosOrientations.Horizontal,
                  [classes.imagesVertical]: areTwoSides && photosOrientation !== PhotosOrientations.Horizontal,
                  [classes.image]: !areTwoSides,
                })}
              >
                {photos.map((photo, index) => (
                  <Grid item key={index} className={classes.image}>
                    <ZoomableImage src={photo} alt={type} />
                    {photos.length > 1 && (
                    <Typography className={classes.subtitle} align="center" variant="subtitle2">
                      {intl.formatMessage({ id: getDocumentSideLabel(index === 0 ? DocumentSides.Front : DocumentSides.Back) })}
                    </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>

              {/* proof of ownership */}
              {proofOfOwnership && (
                <Grid item className={classes.image}>
                  <POOImage step={proofOfOwnership} />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* data */}
          <Grid item xs={12} lg={4} className={classes.itemWrapper}>
            {documentReadingStep && (
              <DocumentReadingStep
                documentType={type}
                step={documentReadingStep}
                fields={fields}
                isEditable={isFormEditable}
                identityId={identity.id}
                onReading={onReading}
                onDocumentUpdate={onDocumentUpdate}
              />
            )}
          </Grid>

          {/* checks */}
          <Grid item xs={12} lg={4} className={classes.itemWrapper}>
            {securityCheckSteps && (
              <Grid container>
                <Box mx={{ xs: 'auto', md: 0.7 }}>
                  <CheckResultLogo status={documentStatus} />
                </Box>
                <Grid item container>
                  {documentFailedCheckSteps.map((step) => (
                    <CheckBarExpandable step={step} key={step.id}>
                      <CheckStepDetails step={step} />
                    </CheckBarExpandable>
                  ))}
                  {securityCheckSteps.map((step) => (
                    <CheckBarExpandable step={step} key={step.id}>
                      <CheckStepDetails step={step} />
                    </CheckBarExpandable>
                  ))}
                  {govChecksSteps.map((step) => (
                    <CheckBarExpandable step={step} key={step.id}>
                      <CheckStepDetails step={step} isGovCheck />
                    </CheckBarExpandable>
                  ))}
                  {premiumAmlWatchlistsStep
                    && (
                      <CheckBarExpandable step={premiumAmlWatchlistsStep} key={premiumAmlWatchlistsStep.id}>
                        <PremiumAmlWatchlistsStepDetails step={premiumAmlWatchlistsStep} />
                      </CheckBarExpandable>
                    )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

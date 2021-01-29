import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks/components/CheckStepDetails/CheckStepDetails';
import { ZoomableImage } from 'apps/identity/components/ZoomableImage/ZoomableImage';
import { useDocumentTitle, usePhotosOrientation } from 'apps/identity/hooks/document.hook';
import { CheckBarExpandable, CheckResultLogo, SkeletonLoader, Warning, WarningTypes } from 'apps/ui';
import { DocumentSides, DocumentSidesOrder, getDocumentSideLabel, PhotosOrientations } from 'models/Document.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { PremiumAmlWatchlistsStepDetails } from '../../../identity/components/PremiumAmlWatchlistsStepDetails/PremiumAmlWatchlistsStepDetails';
import { DocumentReadingStep } from '../DocumentReadingStep/DocumentReadingStep';
import { useStyles } from './DocumentStep.styles';

export function DocumentStep({ document, identity, documentIndex }) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const photosOrientation = usePhotosOrientation(document);

  const { source, type, isEditable = true, securityCheckSteps, documentFailedCheckSteps, govChecksSteps, isSanctioned, premiumAmlWatchlistsStep, fields, documentReadingStep, onReading, documentStatus, areTwoSides, documentSides } = document;
  const isFormEditable = identity.isEditable && source.demo !== true && isEditable;
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
          <Box mt={3}>
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
              {!areTwoSides ? (
                <>
                  {document.photos && document.photos.length > 0 ? document.photos.map((photo) => (photo) && (
                    <Grid item key={photo} className={classes.image}>
                      <ZoomableImage src={photo} alt={type} />
                    </Grid>
                  )) : (
                    <>
                      <Grid item className={classes.image}>
                        <SkeletonLoader animation="wave" variant="rect" height={320} />
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <Grid container justify="center" className={photosOrientation === PhotosOrientations.Horizontal ? `${classes.imagesHorizontal}` : `${classes.imagesVertical}`}>
                  {DocumentSidesOrder.map((side) => {
                    const documentSideIndex = documentSides.indexOf(side);
                    if (documentSideIndex > -1) {
                      return (
                        <Grid item key={document.photos[documentSideIndex]} className={classes.image}>
                          <ZoomableImage src={document.photos[documentSideIndex]} alt={type} />
                          <Typography className={classes.subtitle} align="center" variant="subtitle2">
                            {intl.formatMessage({ id: getDocumentSideLabel(side) })}
                          </Typography>
                        </Grid>
                      );
                    }
                    const unfoundSide = documentSides[0] === DocumentSides.Front ? DocumentSides.Back : DocumentSides.Front;
                    return (
                      <Grid item className={photosOrientation === PhotosOrientations.Horizontal ? `${classes.skeletonHorizontal}` : `${classes.skeletonVertical}`}>
                        {photosOrientation === PhotosOrientations.Horizontal ? (
                          <SkeletonLoader animation="wave" variant="rect" width="100%" height={220} />
                        ) : (
                          <SkeletonLoader animation="wave" variant="rect" width="100%" height="100%" />
                        )}
                        <Typography className={classes.subtitle} align="center" variant="subtitle2">
                          {intl.formatMessage({ id: getDocumentSideLabel(unfoundSide) })}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
          {/* data */}
          <Grid item xs={12} lg={4} className={classes.itemWrapper}>
            <Box className={classes.itemBox}>
              {documentReadingStep && (
                <DocumentReadingStep
                  documentId={source.id}
                  step={documentReadingStep}
                  fields={fields}
                  isEditable={isFormEditable}
                  identityId={identity.id}
                  onReading={onReading}
                />
              )}
            </Box>
          </Grid>
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

import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { useDocumentTitle, usePhotosOrientation } from 'apps/identity/hooks/document.hook';
import { Warning, WarningTypes } from 'apps/ui';
import {
  DocumentConfig,
  DocumentCountrySanctionList,
  isDocumentWithTwoSides,
  DocumentSidesOrder,
  getDocumentSides, getDocumentSideLabel,
  DocumentSides,
  PhotosOrientations,
} from 'models/Document.model';
import { getFieldIsExpired } from 'models/Field.model';
import { CountrySpecificChecks, DocumentSecuritySteps, DocumentStepFrontendChecksTypes, DocumentStepTypes, getDocumentStatus, DocumentFrontendSteps } from 'models/Step.model';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './DocumentStep.styles';
import { CheckBarExpandable } from '../CheckBarExpandable/CheckBarExpandable';
import { DocumentReadingStep } from '../DocumentReadingStep/DocumentReadingStep';
import { ZoomableImage } from '../ZoomableImage/ZoomableImage';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';
import { GovCheckStepDetails, CheckStepDetails } from '../CheckStepDetails/CheckStepDetails';
import { CheckResultLogo } from '../CheckResultLogo/CheckResultLogo';

export function DocumentStep({ document, identity, documentIndex }) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const photosOrientation = usePhotosOrientation(document);

  const { steps = [], country, source, type, isEditable = true } = document;
  const [isSanctioned] = useState(DocumentCountrySanctionList.includes(country));
  const documentReadingStep = steps.find((step) => step.id === DocumentStepTypes.DocumentReading);
  const isFormEditable = identity.isEditable && source.demo !== true && isEditable;
  const onReading = documentReadingStep.status < 200;
  const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
  const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id));
  const documentFailedCheckSteps = steps.filter((step) => DocumentFrontendSteps.includes(step.id)); // it is FRONTEND logic

  const fields = Object.entries(source.fields || {}).map(([id, { value, required }]) => ({
    id,
    value,
    // TODO @dkchv: review this and extract to model
    isValid: !getFieldIsExpired({ id, value }, DocumentConfig[document.type][DocumentStepFrontendChecksTypes.ExpiredDate], identity.dateCreated),
    required,
  }));

  const documentStatus = getDocumentStatus([...govChecksSteps, ...securityCheckSteps, ...documentFailedCheckSteps]);
  const areTwoSides = isDocumentWithTwoSides(document.type);
  const documentSides = getDocumentSides(identity, documentIndex);

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
                    <Grid item spacing={2} key={photo} className={classes.image}>
                      <ZoomableImage src={photo} alt={type} />
                    </Grid>
                  )) : (
                    <>
                      <Grid item spacing={2} className={classes.image}>
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
                        <Grid item spacing={2} key={document.photos[documentSideIndex]} className={classes.image}>
                          <ZoomableImage src={document.photos[documentSideIndex]} alt={type} />
                          <Typography className={classes.subtitle} align="center" variant="subtitle2">{getDocumentSideLabel(side, intl)}</Typography>
                        </Grid>
                      );
                    }
                    const unfoundSide = documentSides[0] === DocumentSides.Front ? DocumentSides.Back : DocumentSides.Front;
                    return (
                      <Grid item spacing={2} className={photosOrientation === PhotosOrientations.Horizontal ? `${classes.skeletonHorizontal}` : `${classes.skeletonVertical}`}>
                        {photosOrientation === PhotosOrientations.Horizontal ? (
                          <SkeletonLoader animation="wave" variant="rect" width="100%" height={220} />
                        ) : (
                          <SkeletonLoader animation="wave" variant="rect" width="100%" height="100%" />
                        )}
                        <Typography className={classes.subtitle} align="center" variant="subtitle2">{getDocumentSideLabel(unfoundSide, intl)}</Typography>
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
                <CheckResultLogo status={documentStatus} />
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
                      <GovCheckStepDetails step={step} />
                    </CheckBarExpandable>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

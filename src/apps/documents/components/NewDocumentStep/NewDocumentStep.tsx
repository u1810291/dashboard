import { Box, Grid, Typography } from '@material-ui/core';
import { CheckStepDetails } from 'apps/checks';
import { POOImage } from 'apps/ProofOfOwnership';
import { CheckBarExpandable, CheckResultLogo, Warning, WarningTypes, ZoomableImage } from 'apps/ui';
import classNames from 'classnames';
import { DocumentSides, DocumentTypes, getDocumentSideLabel, PhotosOrientations, VerificationDocument } from 'models/Document.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Verification } from 'models/Verification.model';
import { AgeCheck } from 'apps/AgeCheck';
import { DuplicateUserDetectionCheck } from 'apps/checks/components/DuplicateUserDetectionCheck/DuplicateUserDetectionCheck';
import { useStyles } from './NewDocumentStep.styles';
import { useDocumentTitle, usePhotosOrientation } from '../../hooks/document.hook';
import { DocumentReadingStep } from '../DocumentReadingStep/DocumentReadingStep';

export function NewDocumentStep({ document, verification, documentIndex, onDocumentUpdate }: {
  document: VerificationDocument;
  verification: Verification;
  documentIndex: number;
  onDocumentUpdate: (normalizedData: any, documentType: DocumentTypes) => Promise<void>;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const photosOrientation = usePhotosOrientation(document);

  const { ageCheck, duplicateUserDetectionStep, type, securityCheckSteps, documentFailedCheckSteps, isSanctioned, fields, documentReadingStep, onReading, documentStatus, proofOfOwnership, photos, areTwoSides } = document;
  const isFormEditable = verification.isEditable;

  return (
    <Box>
      <Box mb={2}>
        <Typography className={classes.title} variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'DocumentStep.Data.title' }, { index: documentIndex + 1 })}</Typography>
        <Grid container alignItems="center">
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

      <Grid container>
        {/* images */}
        <Grid item xs={12} xl={4} className={classes.item}>
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
        <Grid item xs={12} xl={4} className={classes.item}>
          <Box className={classes.itemWrapper}>
            {documentReadingStep && (
              <DocumentReadingStep
                documentType={type}
                step={documentReadingStep}
                fields={fields}
                isEditable={isFormEditable}
                onReading={onReading}
                onDocumentUpdate={onDocumentUpdate}
                identityId={verification?.identity}
              />
            )}
          </Box>
        </Grid>

        {/* checks */}
        <Grid item xs={12} xl={4} className={classes.item}>
          <Box className={classes.itemWrapper}>
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
                  {ageCheck && (<AgeCheck stepData={ageCheck} />)}
                  {duplicateUserDetectionStep && (<DuplicateUserDetectionCheck hideLink stepData={duplicateUserDetectionStep} />)}
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

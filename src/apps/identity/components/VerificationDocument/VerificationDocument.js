import { useIntl } from 'react-intl';
import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PhotosOrientations } from 'models/Document.model';
import { useStyles } from './VerificationDocument.styles';
import { useDocumentTitle, usePhotosOrientation } from '../../hooks/document.hook';
import {
  CountrySpecificChecks,
  DocumentFrontendSteps,
  DocumentSecuritySteps,
  getDocumentStatus, StepStatus,
} from '../../../../models/Step.model';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';
import IconEmpty from '../../../../assets/icon-empty-photo.svg';
import { VerificationCheckCard } from '../VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryChecksContainer } from '../VerificationSummaryChecksContainer/VerificationSummaryChecksContainer';
import { VerificationSummaryTitle } from '../VerificationSummaryTitle/VerificationSummaryTitle';

export function VerificationDocument({ document, documentIndex }) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const [shownPhoto, setShownPhoto] = useState(null);
  const { steps = [], photos = [] } = document; // use these checks for children component
  const photosOrientation = usePhotosOrientation(document);

  useEffect(() => {
    if (!shownPhoto && photos.length) {
      setShownPhoto(photos[0]);
    }
  }, [shownPhoto, photos]);

  const securityCheckSteps = steps.filter((step) => DocumentSecuritySteps.includes(step.id));
  const govChecksSteps = steps.filter((step) => CountrySpecificChecks.includes(step.id));
  const documentFailedCheckSteps = steps.filter((step) => DocumentFrontendSteps.includes(step.id));
  const allSteps = [...documentFailedCheckSteps, ...securityCheckSteps, ...govChecksSteps];

  const documentStatus = getDocumentStatus(allSteps);

  return (
    <VerificationCheckCard
      titleComponent={(
        <VerificationSummaryTitle status={documentStatus} documentIndex={documentIndex}>
          {intl.formatMessage({ id: 'identity.summary.title.document' })}
          {' '}
          {documentIndex + 1}
          {' '}
          (
          {title}
          )
        </VerificationSummaryTitle>
      )}
      bottomComponent={(
        <VerificationSummaryChecksContainer steps={allSteps} />
      )}
    >
      <Grid container className={classes.wrapper}>
        {documentStatus === StepStatus.Checking && !photos.length && (
          <Grid item container justify="center" alignContent="center" className={classes.imageEmpty}>
            <SkeletonLoader animation="wave" variant="rect" height={160} />
          </Grid>
        )}

        {!photos.length && (
          <Grid item container justify="center" alignContent="center" className={classes.imageEmpty}>
            <Box py={2} px={1} align="center">
              <img src={IconEmpty} alt="" />
              <Box align="center" className={classes.emptyCaption}>{intl.formatMessage({ id: 'identity.summary.empty.img' })}</Box>
            </Box>
          </Grid>
        )}

        {photos.length === 1 && (
          <Grid item container justify="center" alignContent="center" className={`${classes.image} ${classes.imageWrapper}`}>
            <img alt="" src={photos[0]} />
          </Grid>
        )}

        {photos.length === 2 && (
          <Grid item container direction="column" justify="center" alignItems="center" alignContent="center" className={`${classes.imageWrapper} ${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageWrapperHorizontal}` : ''}`}>
            <Grid item className={`${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageBigHorizontal}` : `${classes.imageBigVertical}`}`}>
              <img alt="" src={shownPhoto} />
            </Grid>
            <Grid item container justify="center" className={`${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageSmallHorizontal}` : `${classes.imageSmallVertical}`}`}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              {photos.map((photo) => <img alt="" className={photo === shownPhoto ? classes.imageActive : ''} src={photo} onClick={() => setShownPhoto(photo)} key={photo} />)}
            </Grid>
          </Grid>
        )}
      </Grid>
    </VerificationCheckCard>
  );
}
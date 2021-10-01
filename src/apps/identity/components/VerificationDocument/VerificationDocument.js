import { Box, Grid } from '@material-ui/core';
import { VerificationSummaryChecksContainer } from 'apps/checks/components/VerificationSummaryChecksContainer/VerificationSummaryChecksContainer';
import { SkeletonLoader } from 'apps/ui';
import { PhotosOrientations } from 'models/Document.model';
import { StepStatus } from 'models/Step.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDocumentTitle, usePhotosOrientation } from 'apps/documents';
import classNames from 'classnames';
import IconEmpty from 'assets/icon-empty-photo.svg';
import { MediaStatusTypes, ImageContainer } from 'apps/media';
import { VerificationCheckCard } from '../VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from '../VerificationSummaryTitle/VerificationSummaryTitle';
import { useStyles } from './VerificationDocument.styles';

export function VerificationDocument({ document, documentIndex }) {
  const intl = useIntl();
  const classes = useStyles();
  const title = useDocumentTitle(document);
  const [shownPhoto, setShownPhoto] = useState(null);
  const { photos = [], securityCheckSteps, documentFailedCheckSteps, premiumAmlWatchlistsStep, govChecksSteps, documentStatus } = document; // use these checks for children component
  const photosOrientation = usePhotosOrientation(document);

  useEffect(() => {
    if ((!shownPhoto || shownPhoto === MediaStatusTypes.MediaIsLoading) && photos.length) {
      setShownPhoto(photos[0]);
    }
  }, [photos, shownPhoto]);

  const handleSelectShownPhoto = useCallback((src) => () => {
    setShownPhoto(src);
  }, []);

  const allSteps = [...documentFailedCheckSteps, ...securityCheckSteps, ...govChecksSteps];
  if (premiumAmlWatchlistsStep) {
    allSteps.push(premiumAmlWatchlistsStep);
  }

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
      bottomComponent={(documentStatus !== StepStatus.Skipped) ? <VerificationSummaryChecksContainer steps={allSteps} /> : null}
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
            <ImageContainer src={photos[0]} alt="" />
          </Grid>
        )}

        {photos.length === 2 && (
          <Grid item container direction="column" justify="center" alignItems="center" alignContent="center" className={`${classes.imageWrapper} ${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageWrapperHorizontal}` : ''}`}>
            <Grid item container justify="center" alignItems="center" className={`${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageBigHorizontal}` : `${classes.imageBigVertical}`}`}>
              <ImageContainer alt="" src={shownPhoto} className={classes.bigImageMinConstraints} />
            </Grid>
            <Grid item container justify="center" className={`${photosOrientation === PhotosOrientations.Horizontal ? `${classes.imageSmallHorizontal}` : `${classes.imageSmallVertical}`}`}>
              {photos.map((photo, index) => (
                <ImageContainer
                  alt=""
                  className={classNames({ [classes.imageActive]: photo === shownPhoto }, classes.smallImageMinConstraints)}
                  src={photo}
                  onClick={handleSelectShownPhoto(photo)}
                  key={index}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </VerificationCheckCard>
  );
}

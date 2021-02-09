import { Box, Grid, Typography } from '@material-ui/core';
import { SkeletonLoader, ZoomableImage } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './POOImage.styles';

export function POOImage({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  const image = step?.data?.selfiePhotoWithDocumentUrl;

  return (
    <Box mt={5}>
      <Grid container justify="center">
        <Grid item className={classes.image}>
          {image
            ? (
              <ZoomableImage src={image} />
            )
            : (
              <SkeletonLoader animation="wave" variant="rect" width="100%" height={150} />
            )}
          <Typography className={classes.subtitle} align="center" variant="subtitle2">
            {intl.formatMessage({ id: 'ProofOfOwnership.imageDescription' })}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { VerificationDocumentTypes } from 'models/Document.model';
import { useIntl } from 'react-intl';
import { ZoomableImage } from '../ZoomableImage/ZoomableImage';
import { useStyles } from './ChecksByDocument.styles';

export interface ChecksByDocumentProps{
  docType?: VerificationDocumentTypes;
  country?: string;
  children: React.ReactNode;
  photos: string[];
}

export function ChecksByDocument({ docType, country, children, photos }: ChecksByDocumentProps) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box p={1.5} className={classes.container}>
      <Box mb={1} color="common.black75" fontWeight="bold">
        {docType && intl.formatMessage({ id: `flow.documentTypeStep.${docType}` }) }
        ,&nbsp;
        {country}
      </Box>
      <Grid container spacing={1}>
        {photos?.map((photo, index) => (
          <Grid key={index} item xs={6}>
            <Box className={classes.image}>
              <ZoomableImage src={photo} alt={docType} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={2} className={classes.wrapper}>
        {children}
      </Box>
    </Box>
  );
}

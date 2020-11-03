import { Box, Button, Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FiExternalLink, FiSmartphone } from 'react-icons/fi';
import { useStyles } from './GithubDocumentationBanner.styles';

export const GithubDocumentationBanner = ({ platform, documentationURL }) => {
  const classes = useStyles();

  const handleRedirect = useCallback(() => {
    window.open(documentationURL, '_blank');
  }, [documentationURL]);

  return (
    <Grid container justify="space-between" className={classes.wrapper}>
      <Grid item container wrap="nowrap" alignItems="center" className={classes.textWrapper}>
        <Grid container justify="center" alignItems="center" className={classes.icon}>
          <FiSmartphone />
        </Grid>
        <Box color="common.black90" fontSize={18}>
          Visit our
          {' '}
          {platform}
          {' '}
          GitHub documentation
        </Box>
      </Grid>
      <Grid item className={classes.buttonWrapper}>
        <Button
          onClick={handleRedirect}
          className={classes.button}
          variant="outlined"
          fullWidth
        >
          {platform}
          {' '}
          Documentation
          <FiExternalLink />
        </Button>
      </Grid>
    </Grid>
  );
};

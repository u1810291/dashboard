import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { FiSmartphone, FiExternalLink } from 'react-icons/fi';
import { useStyles } from './GithubDocumentationBanner.styles';

export const GithubDocumentationBanner = ({ platform }) => {
  const classes = useStyles();

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

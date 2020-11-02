import Grid from '@material-ui/core/Grid';
import React from 'react';
import Button from '../../../../components/button';

export const GithubDocumentationBanner = ({ platform }) => (
  <Grid container>
    <Grid item>
      Visit our
      {' '}
      {platform}
      {' '}
      GitHub documentation
    </Grid>
    <Grid item>
      <Button>
        {platform}
        {' '}
        Documentation
      </Button>
    </Grid>
  </Grid>
);

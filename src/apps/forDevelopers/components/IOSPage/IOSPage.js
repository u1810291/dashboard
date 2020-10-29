import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { GithubDocumentationBanner } from '../GithubDocumentationBanner/GithubDocumentationBanner';

export const IOSPage = () => (
  <Grid container>
    <GithubDocumentationBanner />
    <Grid item>
      <Typography>Native MobileSDK iOS Integration</Typography>
      <Typography>If you have native apps, our mobile SDKs are here for you. The integration takes some lines of code.</Typography>
    </Grid>
  </Grid>
);

import { Container, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { LiveStatusBanner } from 'apps/liveStatusBanner';
import React from 'react';
import { useStyles } from './Footer.styles';
import facebookLogo from './images/facebookLogo.svg';
import linkedInLogo from './images/linkedInLogo.svg';
import twitterLogo from './images/twitterLogo.svg';

export function Footer() {
  const classes = useStyles();

  return (
    <Paper color="secondary" square elevation={0} className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container>
          {/* left */}
          <Grid item className={classes.company}>
            <LiveStatusBanner />
          </Grid>

          {/* right */}
          <Grid item className={classes.links}>
            <Link
              className={classes.socialLink}
              href="https://www.facebook.com/mativerifications"
              target="_blank"
            >
              <img src={facebookLogo} alt="facebook" />
            </Link>
            <Link
              className={classes.socialLink}
              href="https://www.linkedin.com/company/getmati"
              target="_blank"
            >
              <img src={linkedInLogo} alt="linkedin" />
            </Link>
            <Link
              className={classes.socialLink}
              href="https://twitter.com/getmati"
              target="_blank"
            >
              <img src={twitterLogo} alt="twitter" />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

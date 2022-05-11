import { Container, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
        <Grid justifyContent="flex-end" container>

          {/* right */}
          <Grid item className={classes.links}>
            <Link
              className={classes.socialLink}
              href="https://www.facebook.com/viametamap"
              target="_blank"
              rel="noopener"
            >
              <img src={facebookLogo} alt="facebook" className={classes.linkImage} />
            </Link>
            <Link
              className={classes.socialLink}
              href="https://www.linkedin.com/company/metmap/"
              target="_blank"
              rel="noopener"
            >
              <img src={linkedInLogo} alt="linkedin" className={classes.linkImage} />
            </Link>
            <Link
              className={classes.socialLink}
              href="https://twitter.com/viaMetaMap"
              target="_blank"
              rel="noopener"
            >
              <img src={twitterLogo} alt="twitter" className={classes.linkImage} />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

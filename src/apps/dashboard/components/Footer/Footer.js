import { Box, Container, Hidden, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import matiLogo from 'assets/mati-logo-v3.svg';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './Footer.styles';
import facebookLogo from './images/facebookLogo.svg';
import linkedInLogo from './images/linkedInLogo.svg';
import twitterLogo from './images/twitterLogo.svg';

export function Footer() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper color="secondary" square elevation={0} className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        {/* left */}
        <Box className={classes.company}>
          <Hidden smDown>
            <img src={matiLogo} className={classes.img} alt="" />
            <Box className={classes.message}>
              {intl.formatMessage({ id: 'Footer.withLove.text' },
                {
                  heart: (
                    <Box component="span" px={0.25}>
                      { intl.formatMessage({ id: 'Footer.withLove.heart' }) }
                    </Box>
                  ),
                })}
            </Box>
          </Hidden>
          <Link className={classes.statusPage} href="https://mati.statuspage.io/">{intl.formatMessage({ id: 'Footer.statusPage' })}</Link>
        </Box>

        {/* right */}
        <Box className={classes.links}>
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
        </Box>
      </Container>
    </Paper>
  );
}

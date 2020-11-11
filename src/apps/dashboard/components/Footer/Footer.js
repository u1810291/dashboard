import { Box, Container, Hidden, Paper } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import Link from '@material-ui/core/Link';
import matiLogo from 'assets/mati-logo-v3.svg';
import { useStyles } from './Footer.styles';
import facebookLogo from './images/facebookLogo.svg';
import twitterLogo from './images/twitterLogo.svg';
import linkedInLogo from './images/linkedInLogo.svg';
import { FreshworksWidgetButton } from '../../../layout/components/FreshworksWidgetButton/FreshworksWidgetButton';

export function Footer() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper color="secondary" square elevation={0} className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        {/* left */}
        <Hidden smDown>
          <Box className={classes.company}>
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
          </Box>
        </Hidden>
        {/* right */}
        <Box className={classes.links}>
          <Hidden smDown>
            <Box className={classes.link}>
              <Link
                className={classes.emailLink}
                color="primary"
                href="mailto:hello@mati.io"
                rel="noopener"
                target="_blank"
              >
                hello@mati.io
              </Link>
            </Box>
          </Hidden>
          <Box className={classes.widget}>
            <FreshworksWidgetButton text={intl.formatMessage({ id: 'Footer.support' })} />
          </Box>
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

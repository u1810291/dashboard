import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Link from '@material-ui/core/Link';
import { useIntl } from 'react-intl';
import { ReactComponent as TalkBoxIcon } from 'assets/icon-talk-box.svg';
import classNames from 'classnames';
import { DarkFaqSection } from '../DarkFaqSection/DarkFaqSection';
import { useStyles } from './ContactUs.styles';

export function ContactUs() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <DarkFaqSection>
      <Box className={classes.supportIconBox}>
        <Box flexGrow={0}>
          <TalkBoxIcon className={classes.supportIcon} />
        </Box>
        <Box flexGrow={1} />
      </Box>
      <Box>
        <Grid container spacing={0} className={classes.wrapGrid}>
          <Grid item xs={12}>
            <Typography component="h3" className={classes.title}>
              {intl.formatMessage({ id: 'FAQ.contactUs.title' })}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {intl.formatMessage({ id: 'FAQ.contactUs.1.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <ul className={classes.list}>
              <li>
                <Typography variant="body2" className={classes.answer}>
                  {intl.formatMessage({ id: 'FAQ.contactUs.1.list.1' })}
                </Typography>
              </li>
              <li>
                <Typography variant="body2" className={classes.answer}>
                  {intl.formatMessage(
                    { id: 'FAQ.contactUs.1.list.2' },
                    {
                      email: (
                        <Link
                          className={classes.emailLink}
                          color="primary"
                          href="mailto:support@getmati.com"
                          rel="noopener"
                        >
                          support@getmati.com
                        </Link>
                      ),
                    },
                  )}
                </Typography>
              </li>
            </ul>
            <Typography variant="body2" className={classNames(classes.answer, classes.topGutter)}>
              {intl.formatMessage({ id: 'FAQ.contactUs.1.answer' })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {intl.formatMessage({ id: 'FAQ.contactUs.2.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <Typography variant="body2" className={classes.answer}>
              {intl.formatMessage(
                { id: 'FAQ.contactUs.2.answer' },
                {
                  email: (
                    <Link
                      className={classes.emailLink}
                      color="primary"
                      href="mailto:diana.cardoso@getmati.com"
                      rel="noopener"
                    >
                      diana.cardoso@getmati.com
                    </Link>
                  ),
                },
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {intl.formatMessage({ id: 'FAQ.contactUs.3.question' })}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.bottomGutter}>
          <Typography variant="body2" className={classes.answer}>
            {intl.formatMessage({ id: 'FAQ.contactUs.3.answer' })}
          </Typography>
          <ul className={classNames(classes.topGutter, classes.list)}>
            <li>
              <Typography variant="body2" className={classes.answer}>
                {intl.formatMessage(
                  { id: 'FAQ.contactUs.3.list.1' },
                  {
                    email: (
                      <Link
                        className={classes.emailLink}
                        color="primary"
                        href="mailto:filip@getmati.com"
                        rel="noopener"
                      >
                        filip@getmati.com
                      </Link>
                    ),
                  },
                )}
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className={classes.answer}>
                {intl.formatMessage(
                  { id: 'FAQ.contactUs.3.list.2' },
                  {
                    email: (
                      <Link
                        className={classes.emailLink}
                        color="primary"
                        href="mailto:amaury@getmati.com"
                        rel="noopener"
                      >
                        amaury@getmati.com
                      </Link>
                    ),
                  },
                )}
              </Typography>
            </li>
          </ul>
        </Grid>
      </Box>
    </DarkFaqSection>

  );
}

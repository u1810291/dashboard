import { Box, Grid, Typography } from '@material-ui/core';
import { useFormatMessage } from 'apps/intl';
import React from 'react';
import Link from '@material-ui/core/Link';
import { ReactComponent as TalkBoxIcon } from 'assets/icon-talk-box.svg';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'state/merchant/merchant.selectors';
import { DarkFaqSection } from '../DarkFaqSection/DarkFaqSection';
import { useStyles } from './ContactUs.styles';
import { requestFeatureLinks } from '../../models/FAQ.model';

export function ContactUs() {
  const formatMessage = useFormatMessage();
  const currentLocale = useSelector(selectLanguage);
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
              {formatMessage({ id: 'FAQ.contactUs.title' })}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {formatMessage({ id: 'FAQ.contactUs.1.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <Typography variant="body2" className={classes.answer}>
              {formatMessage({ id: 'FAQ.contactUs.1.answer' })}
            </Typography>
            <ul className={classNames(classes.list, classes.topGutter)}>
              <li>
                <Typography variant="body2" className={classes.answer}>
                  {formatMessage({ id: 'FAQ.contactUs.1.list.1' })}
                </Typography>
              </li>
              <li>
                <Typography variant="body2" className={classes.answer}>
                  {formatMessage({
                    id: 'FAQ.contactUs.1.list.2',
                    messageValues: {
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
                  })}
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {formatMessage({ id: 'FAQ.contactUs.2.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <Typography variant="body2" className={classes.answer}>
              {formatMessage({
                id: 'FAQ.contactUs.2.answer',
                messageValues: {
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
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {formatMessage({ id: 'FAQ.contactUs.3.question' })}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.bottomGutter}>
          <Typography variant="body2" className={classes.answer}>
            {formatMessage({ id: 'FAQ.contactUs.3.answer' })}
          </Typography>
          <ul className={classNames(classes.topGutter, classes.list)}>
            <li>
              <Typography variant="body2" className={classes.answer}>
                {formatMessage({
                  id: 'FAQ.contactUs.3.list.1',
                  messageValues: {
                    email: (
                      <Link
                        className={classes.emailLink}
                        color="primary"
                        href="mailto:fv@getmati.com"
                        rel="noopener"
                      >
                        fv@getmati.com
                      </Link>
                    ),
                  },
                })}
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className={classes.answer}>
                {formatMessage({
                  id: 'FAQ.contactUs.3.list.2',
                  messageValues: {
                    email: (
                      <Link
                        className={classes.emailLink}
                        color="primary"
                        href="mailto:as@getmati.com"
                        rel="noopener"
                      >
                        as@getmati.com
                      </Link>
                    ),
                  },
                })}
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" className={classes.question}>
            {formatMessage({ id: 'FAQ.contactUs.4.question' })}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.bottomGutter}>
          <Typography variant="body2" className={classes.answer}>
            {formatMessage({
              id: 'FAQ.contactUs.4.answer',
              messageValues: {
                link: (
                  <Link
                    className={classes.emailLink}
                    color="primary"
                    href={requestFeatureLinks[currentLocale]}
                    rel="noopener"
                    target="_blank"
                  >
                    {formatMessage({ id: 'Link.here' })}
                  </Link>
                ),
              },
            })}
          </Typography>
        </Grid>
      </Box>
    </DarkFaqSection>
  );
}

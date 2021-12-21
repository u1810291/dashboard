import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography, Grid } from '@material-ui/core';
import { ReactComponent as TalkBoxIcon } from 'assets/icon-talk-box.svg';
import Link from '@material-ui/core/Link';
import { DarkFaqSection } from '../DarkFaqSection/DarkFaqSection';
import { useStyles } from './Support.styles';

export function Support() {
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
              {intl.formatMessage({ id: 'FAQ.support.title' })}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {intl.formatMessage({ id: 'FAQ.support.1.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <Typography variant="body2" className={classes.answer}>
              {intl.formatMessage(
                { id: 'FAQ.support.1.answer' },
                {
                  email: (
                    <Link
                      className={classes.emailLink}
                      color="primary"
                      href="mailto:support@metamap.com"
                      rel="noopener"
                    >
                      support@metamap.com
                    </Link>
                  ),
                },
              )}
            </Typography>
            <ul className={classes.list}>
              <li>
                { intl.formatMessage({ id: 'FAQ.support.1.list.1' }) }
              </li>
              <li>
                { intl.formatMessage({ id: 'FAQ.support.1.list.2' }) }
              </li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h3" className={classes.question}>
              {intl.formatMessage({ id: 'FAQ.support.2.question' })}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.bottomGutter}>
            <Typography variant="body2" className={classes.answer}>
              {intl.formatMessage({ id: 'FAQ.support.2.answer.1' })}
              <br />
              {intl.formatMessage(
                { id: 'FAQ.support.2.answer.2' },
                {
                  identityId: (
                    <Box component="span" className={classes.verification}>
                      3323232301b3356c5
                    </Box>
                  ),
                },
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </DarkFaqSection>
  );
}

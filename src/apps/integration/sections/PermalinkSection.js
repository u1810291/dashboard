import { Grid, Link, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import React from 'react';
import { useIntl } from 'react-intl';

export function PermalinkSection({ clientId }) {
  const intl = useIntl();
  const url = permalinkUrl({ clientId });

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h6" gutterBottom>{intl.formatMessage({ id: 'PermalinkSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'PermalinkSection.description' })}</Typography>
      </Grid>
      <Grid item xs={5}>
        <CopyToClipboard text={url}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trimMiddle(url, 20)}
          </Link>
        </CopyToClipboard>
      </Grid>
    </Grid>
  );
}

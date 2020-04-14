import { Grid, Link, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { Loadable } from 'components/Loadable/Loadable';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectClientIdModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';

export function PermalinkSection() {
  const intl = useIntl();
  const clientIdModel = useSelector(selectClientIdModel);
  const flowId = useSelector(selectCurrentFlowId);

  return (
    <Grid container spacing={2} justify="space-between" alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'PermalinkSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'PermalinkSection.description' })}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Loadable
          model={clientIdModel}
          render={(clientId) => {
            const url = permalinkUrl({ clientId, flowId });
            return (
              <CopyToClipboard text={url} qa={QATags.Integration.Perma.Copy}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-qa={QATags.Integration.Perma.Value}
                >
                  {trimMiddle(url, 20)}
                </Link>
              </CopyToClipboard>
            );
          }}
        />
      </Grid>
    </Grid>
  );
}

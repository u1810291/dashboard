import { Box, Button, Grid, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { Loadable } from 'components/Loadable/Loadable';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAppLastModel } from 'state/merchant/merchant.selectors';

export function DocumentationSection() {
  const intl = useIntl();
  const appModel = useSelector(selectAppLastModel);

  return (
    <Grid container justify="space-between" spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'DocumentationSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'DocumentationSection.description' })}</Typography>
        <Button
          variant="outlined"
          href="https://docs.getmati.com"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          startIcon={<FiFileText size={14} />}
          data-qa={QATags.Integration.Button.MatiDoc}
        >
          {intl.formatMessage({ id: 'DocumentationSection.cta' })}
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h6">{intl.formatMessage({ id: 'DocumentationSection.clientId' })}</Typography>
          <Loadable
            model={appModel}
            render={(value) => (
              <CopyToClipboard text={value.clientId} qa={QATags.Integration.ClientId.Copy}>
                <code data-qa={QATags.Integration.ClientId.Value}>{appModel.value.clientId}</code>
              </CopyToClipboard>
            )}
          />
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6">{intl.formatMessage({ id: 'DocumentationSection.clientSecret' })}</Typography>
          <Loadable
            model={appModel}
            render={(value) => (
              <CopyToClipboard text={value.clientSecret} qa={QATags.Integration.ClientSecret.Copy}>
                <code data-qa={QATags.Integration.ClientSecret.Value}>{(value.clientSecret || '').replace(/./g, '*')}</code>
              </CopyToClipboard>
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

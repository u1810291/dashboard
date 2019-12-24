import { Box, Button, Grid, Typography } from '@material-ui/core';
import { CopyToClipboard } from 'components/clipboard';
import { Loadable } from 'components/Loadable/Loadable';
import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAppLastModel } from 'state/merchant/merchant.selectors';

export function DocumentationSection() {
  const intl = useIntl();
  const appModel = useSelector(selectAppLastModel);

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h5" gutterBottom>{intl.formatMessage({ id: 'DocumentationSection.title' })}</Typography>
        <Typography paragraph>{intl.formatMessage({ id: 'DocumentationSection.description' })}</Typography>
        <Button
          variant="outlined"
          href="https://docs.getmati.com"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          startIcon={<FiFileText size="1rem" />}
        >
          {intl.formatMessage({ id: 'DocumentationSection.cta' })}
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Box>
          <Typography variant="h6">{intl.formatMessage({ id: 'DocumentationSection.clientId' })}</Typography>
          <Loadable
            model={appModel}
            render={(value) => (
              <CopyToClipboard text={value.clientId}>
                <code>{appModel.value.clientId}</code>
              </CopyToClipboard>
            )}
          />
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6">{intl.formatMessage({ id: 'DocumentationSection.clientSecret' })}</Typography>
          <Loadable
            model={appModel}
            render={(value) => (
              <CopyToClipboard text={value.clientSecret}>
                <code>{(value.clientSecret).replace(/./g, '*')}</code>
              </CopyToClipboard>
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

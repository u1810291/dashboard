import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { SyntaxHighlighter, SyntaxHighlighterLanguages } from 'apps/ui';
import { selectClientId, selectCurrentFlowId } from '../../../../../state/merchant/merchant.selectors';
import { integrationCode } from '../../../../../models/Integration.model';

export function WebCodeSnippet() {
  const intl = useIntl();
  const clientId = useSelector(selectClientId);
  const flowId = useSelector(selectCurrentFlowId);

  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'forDevs.informationPage.webCopy.header' })}</Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.informationPage.webCopy.subheader' })}
      </Box>
      <Box maxWidth="100%">
        <SyntaxHighlighter
          code={integrationCode({ clientId, flowId })}
          language={SyntaxHighlighterLanguages.HTML}
          withCopyText
        />
      </Box>
    </Grid>
  );
}

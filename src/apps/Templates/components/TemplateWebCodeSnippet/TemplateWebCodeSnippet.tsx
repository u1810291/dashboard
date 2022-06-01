import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useFormatMessage } from 'apps/intl';
import { SyntaxHighlighter, SyntaxHighlighterLanguages } from 'apps/ui';
import { integrationCode } from 'models/Integration.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectClientId } from 'state/merchant/merchant.selectors';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModelValue } from '../../store/Templates.selectors';

export function TemplateWebCodeSnippet() {
  const formatMessage = useFormatMessage();
  const clientId = useSelector<any, string>(selectClientId);
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);

  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{formatMessage('forDevs.informationPage.webCopy.header')}</Typography>
      <Box mb={2} color="common.black75">
        {formatMessage('forDevs.informationPage.webCopy.subheader')}
      </Box>
      <Box maxWidth="100%">
        <SyntaxHighlighter
          code={integrationCode({ clientId, flowId: currentTemplate?.flow._id })}
          language={SyntaxHighlighterLanguages.HTML}
          withCopyText
        />
      </Box>
    </Grid>
  );
}

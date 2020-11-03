import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { SyntaxHighlighter } from '../../../../../components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from '../../../../../components/syntax-highlighter/SyntaxHighlighter.model';
import { selectClientId, selectCurrentFlowId } from '../../../../../state/merchant/merchant.selectors';

export const WebCodeSnippet = () => {
  const intl = useIntl();
  const clientId = useSelector(selectClientId);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const snippet = '<script src="https://web-button.getmati.com/button.js">\n'
    + '</script>\n'
    + '<mati-button\n'
    + `  clientid="${clientId}"\n`
    + `  flowId="${currentFlowId}"\n`
    + '  metadata=""\n'
    + '/>';

  return (
    <Grid container direction="column">
      <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'forDevs.informationPage.webCopy.header' })}</Typography>
      <Box mb={2} color="common.black75">
        {intl.formatMessage({ id: 'forDevs.informationPage.webCopy.subheader' })}
      </Box>
      <Box mb={2}>
        <SyntaxHighlighter
          code={snippet}
          language={SyntaxHighlighterLanguages.HTML}
          withCopyText
        />
      </Box>
    </Grid>
  );
};

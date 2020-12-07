import { Box, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { getFileContents } from 'lib/client/checks';
import { CopyToClipboard } from '../../../../components/clipboard';
import { useStyles } from './Nom151Check.styles';

export function Nom151Check({ data = {} }) {
  const classes = useStyles();
  const intl = useIntl();
  const [fileContent, setFileContent] = useState('...');
  useEffect(() => {
    // TODO: do this with identity load
    async function fetchData() {
      try {
        const file = await getFileContents(data.publicUrl);
        setFileContent(file.data);
      } catch {
        setFileContent(data.publicUrl);
      }
    }
    fetchData();
  }, [data]);

  return (
    <Paper>
      <Box p={2} className={classes.container}>
        <Box mb={2}>
          <Typography variant="subtitle2" className={classes.title}>
            {intl.formatMessage({ id: 'Product.checks.nom151Check.title' })}
          </Typography>
        </Box>
        <SyntaxHighlighter
          code={fileContent}
          className={classes.timestampSyntax}
          withCopyText
          isCopyToClipboard={false}
          isLightBlueTheme
        />
        <Box mb={2} mt={2}>
          <Typography variant="subtitle2" className={classes.title}>
            {intl.formatMessage({ id: 'Product.checks.nom151Check.id' })}
          </Typography>
        </Box>
        <Box mb={2} className={classes.uniqueId}>
          <CopyToClipboard withText withCopyText text={data.hash}>
            {data.hash}
          </CopyToClipboard>
        </Box>
      </Box>
    </Paper>
  );
}

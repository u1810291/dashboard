import React from 'react';
import { useIntl } from 'react-intl';
import { Paper, Typography, Box } from '@material-ui/core';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import stringify from 'lib/stringify';
import { useStyles } from './VerificationMetadata.styles';

export function VerificationMetadata({ metadata = {} }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <Box mb={2}>
          <Typography variant="subtitle2" className={classes.title}>
            {intl.formatMessage({ id: 'VerificationMetadata.title' })}
          </Typography>
        </Box>
        <SyntaxHighlighter
          code={stringify(metadata)}
          language={SyntaxHighlighterLanguages.JavaScript}
          isLightYellowTheme
          withCopyText
        />
      </Box>
    </Paper>
  );
}

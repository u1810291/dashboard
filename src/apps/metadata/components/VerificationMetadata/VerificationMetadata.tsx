import React from 'react';
import { useIntl } from 'react-intl';
import { Paper, Typography, Box } from '@material-ui/core';
import { SyntaxHighlighter, SyntaxHighlighterLanguages } from 'apps/ui';
import stringify from 'lib/stringify';
import { useStyles } from './VerificationMetadata.styles';

export interface VerificationMetadataProps{
  metadata?: any,
}

export function VerificationMetadata({ metadata = {} }: VerificationMetadataProps) {
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

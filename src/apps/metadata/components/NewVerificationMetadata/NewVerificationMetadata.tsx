import React from 'react';
import { Box } from '@material-ui/core';
import { SyntaxHighlighter, SyntaxHighlighterLanguages } from 'apps/ui';
import stringify from 'lib/stringify';

export interface VerificationMetadataProps{
  metadata?: any;
}

export function NewVerificationMetadata({ metadata = {} }: VerificationMetadataProps) {
  return (
    <Box>
      <SyntaxHighlighter
        code={stringify(metadata)}
        language={SyntaxHighlighterLanguages.JavaScript}
        isLightYellowTheme
        withCopyText
      />
    </Box>
  );
}

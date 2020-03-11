import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card, CardContent } from '@material-ui/core';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import stringify from 'lib/stringify';

export function VerificationMetadata({ metadata = {} }) {
  return (
    <Card>
      <CardContent>
        <h2>
          <FormattedMessage id="VerificationMetadata.title" />
        </h2>
        <SyntaxHighlighter
          code={stringify(metadata)}
          language={SyntaxHighlighterLanguages.JavaScript}
          isBorder={false}
          isCopyToClipboard={false}
        />
      </CardContent>
    </Card>
  );
}

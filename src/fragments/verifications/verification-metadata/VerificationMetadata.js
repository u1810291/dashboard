import Card from 'components/card';
import { SyntaxHighlighter } from 'components/syntax-highlighter';
import { SyntaxHighlighterLanguages } from 'components/syntax-highlighter/SyntaxHighlighter.model';
import stringify from 'lib/stringify';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function VerificationMetadata({ metadata = {} }) {
  return (
    <Card>
      <h2>
        <FormattedMessage id="VerificationMetadata.title" />
      </h2>
      <SyntaxHighlighter
        code={stringify(metadata)}
        language={SyntaxHighlighterLanguages.JavaScript}
        isBorder={false}
        isCopyToClipboard={false}
      />
    </Card>
  );
}

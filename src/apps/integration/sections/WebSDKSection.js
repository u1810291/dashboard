import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Card } from 'components';
import { H2 } from 'components/text';
import SyntaxHighlighter from 'components/syntax-highlighter';

export default function WebSDKSection({ integrationCode }) {
  return (
    <Card flow="column" align="center" templateColumns="5fr 4fr" shadow="2">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.websdk.title" />
        <p>
          <FormattedMessage id="apps.integration.websdk.subtitle" />
        </p>
      </H2>
      <SyntaxHighlighter
        language="html"
        code={integrationCode}
        border="secondary"
      />
    </Card>
  );
}

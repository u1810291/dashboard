import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Items } from 'components';
import { H2 } from 'components/text';
import SyntaxHighlighter from 'components/syntax-highlighter';
import Frameworks from './web-frameworks.png';

export default function WebSDKSection({ integrationCode }) {
  return (
    <Items align="center" templateColumns="1fr 1fr" gap="24">
      <H2 weight="2">
        <Items templateColumns="3fr 2fr 3fr" align="center">
          <FormattedMessage id="apps.integration.websdk.title" />
          <img src={Frameworks} alt="supported frameworks" />
        </Items>
        <p>
          <FormattedMessage id="apps.integration.websdk.subtitle" />
        </p>
      </H2>
      <SyntaxHighlighter
        language="html"
        code={integrationCode}
        border="secondary"
      />
    </Items>
  );
}

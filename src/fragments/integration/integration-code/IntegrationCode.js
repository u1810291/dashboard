import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Items, H3 } from 'components';
import SyntaxHighlighter from 'components/syntax-highlighter';
import MatiDocs from 'fragments/account/mati-docs';

const integrationCode = `
<script src="https://web-button.mati.io/button.js">
</script>
<mati-button
  clientid="YOUR_CLIENT_ID"
  metadata="JSON_METADATA_STRING"
/>
`;

export default function IntegrationCode() {
  return (
    <Items flow="column" templateColumns="2fr 1fr" gap={2}>
      <Items flow="row">
        <H3 color="blue">
          <FormattedMessage id="fragments.integration.integration-code.titleWeb" />
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        </H3>
        <SyntaxHighlighter language="html" code={integrationCode} />
        <a
          href="https://github.com/MatiFace/mati-web-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="fragments.integration.integration-code.websdkDocs" />
        </a>
      </Items>
      <Items flow="row" gap={2}>
        <H3 color="blue">
          <FormattedMessage id="fragments.integration.integration-code.titleMobile" />
        </H3>
        <MatiDocs />
      </Items>
    </Items>
  );
}

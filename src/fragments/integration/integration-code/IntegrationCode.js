import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Items, H3 } from 'components';
import SyntaxHighlighter from 'components/syntax-highlighter';
import MatiDocs from 'fragments/account/mati-docs';

export default function IntegrationCode({ oldIntegrationCode }) {
  return (
    <Items flow="column" templateColumns="2fr 1fr" gap={2}>
      <Items flow="row">
        <H3 color="blue">
          <FormattedMessage id="fragments.integration.integration-code.titleWeb" />
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        </H3>
        <SyntaxHighlighter language="html" code={oldIntegrationCode} />
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

IntegrationCode.propTypes = {
  oldIntegrationCode: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Items, H3 } from 'components';
import SyntaxHighlighter from 'components/syntax-highlighter';
import MatiDocs from 'fragments/account/mati-docs';

import styles from './IntegrationCode.module.scss';

export default function IntegrationCode({ integrationCode, oldIntegrationCode }) {
  const [showOldCodeVersion, setShowOldCodeVersion] = useState(false);
  return (
    <Items flow="column" templateColumns="2fr 1fr" gap={2}>
      <Items flow="row">
        <H3 color="blue">
          <FormattedMessage id="fragments.integration.integration-code.titleWeb" />
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <span
            className={styles.link}
            onClick={() => setShowOldCodeVersion(!showOldCodeVersion)}
            onKeyUp={() => {}}
            role="button"
            tabIndex={0}
          >
            <FormattedMessage
              id={showOldCodeVersion
                ? 'fragments.integration.integration-code.newCode'
                : 'fragments.integration.integration-code.oldCode'}
            />
          </span>
        </H3>
        <SyntaxHighlighter language="html" code={showOldCodeVersion ? oldIntegrationCode : integrationCode} />
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
  integrationCode: PropTypes.string.isRequired,
  oldIntegrationCode: PropTypes.string.isRequired,
};

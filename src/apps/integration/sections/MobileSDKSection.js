import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Items, Click, Card } from 'components';
import { H2 } from 'components/text';

export default function MobileSDKSection() {
  return (
    <Card flow="column" align="center" templateColumns="2fr 1fr" shadow="2">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.mobilesdk.title" />
        <p>
          <FormattedMessage id="apps.integration.mobilesdk.subtitle" />
        </p>
      </H2>
      <Items flow="row">
        <Click
          as="a"
          href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md"
          target="_blank"
          rel="noopener noreferrer"
          border="secondary"
        >
          <FormattedMessage id="apps.integration.mobilesdk.ctaios" />
        </Click>
        <Click
          as="a"
          href="https://github.com/MatiFace/mati-global-id-sdk-integration-android"
          target="_blank"
          rel="noopener noreferrer"
          border="secondary"
        >
          <FormattedMessage id="apps.integration.mobilesdk.ctaandroid" />
        </Click>
      </Items>
    </Card>
  );
}

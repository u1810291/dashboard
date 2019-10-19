import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Items, Click } from 'components';
import { H2 } from 'components/text';
import { ReactComponent as IconIos } from './icon-ios.svg';
import { ReactComponent as IconAndroid } from './icon-android.svg';

export default function MobileSDKSection() {
  return (
    <Items align="center" templateColumns="1fr 1fr" gap="24">
      <H2 weight="2">
        <Items gap="4" align="center" inline>
          <FormattedMessage id="apps.integration.mobilesdk.title" />
          <Items gap="1" inline>
            <IconIos />
            <IconAndroid />
          </Items>
        </Items>
        <p>
          <FormattedMessage id="apps.integration.mobilesdk.subtitle" />
        </p>
      </H2>
      <Items templateColumns="4fr 1fr">
        <Items flow="row">
          <Click
            as="a"
            href="https://github.com/MatiFace/mati-global-id-sdk/blob/master/Integration_iOS.md"
            target="_blank"
            rel="noopener noreferrer"
            border="secondary"
          >
            <IconIos />
            <FormattedMessage id="apps.integration.mobilesdk.ctaios" />
          </Click>
          <Click
            as="a"
            href="https://github.com/MatiFace/mati-global-id-sdk-integration-android"
            target="_blank"
            rel="noopener noreferrer"
            border="secondary"
          >
            <IconAndroid />
            <FormattedMessage id="apps.integration.mobilesdk.ctaandroid" />
          </Click>
        </Items>
      </Items>
    </Items>
  );
}

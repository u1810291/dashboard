import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Click, Items } from 'components';
import Icons from 'components/icons';
import { H2 } from 'components/text';

export default function WebhookDocumentationSection() {
  return (
    <Items align="center" templateColumns="1fr 1fr" gap="24">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.webhook.title" />
        <p>
          <FormattedMessage id="apps.integration.webhook.subtitle" />
        </p>
      </H2>
      <Items templateColumns="4fr 1fr">
        <Click
          as="a"
          href="https://docs.getmati.com/#iv-webhooks-receive-user-verification-data"
          border="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.Paper />
          <FormattedMessage id="apps.integration.webhook.cta" />
        </Click>
      </Items>
    </Items>
  );
}

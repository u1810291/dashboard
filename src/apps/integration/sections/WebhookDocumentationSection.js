import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Click, Card } from 'components';
import { H2 } from 'components/text';

export default function WebhookDocumentationSection() {
  return (
    <Card flow="column" align="center" templateColumns="2fr 1fr" shadow="2">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.webhook.title" />
        <p>
          <FormattedMessage id="apps.integration.webhook.subtitle" />
        </p>
      </H2>
      <Click
        as="a"
        href="https://docs.getmati.com/#iv-webhooks-receive-user-verification-data"
        border="secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="apps.integration.webhook.cta" />
      </Click>
    </Card>
  );
}

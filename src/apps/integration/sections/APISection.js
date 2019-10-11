import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Click, Card } from 'components';
import { H2 } from 'components/text';

export default function APISection() {
  return (
    <Card flow="column" align="center" templateColumns="2fr 1fr" shadow="2">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.api.title" />
        <p>
          <FormattedMessage id="apps.integration.api.subtitle" />
        </p>
      </H2>
      <Click as="a" href="https://docs.getmati.com/" border="secondary">
        <FormattedMessage id="apps.integration.api.cta" />
      </Click>
    </Card>
  );
}

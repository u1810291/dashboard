import { Card, Items } from 'components';
import { H2, HR } from 'components/text';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { APISection, DocumentationSection, MobileSDKSection, PermalinkSection, WebhookDocumentationSection, WebhookSection, WebSDKSection } from './sections';

const integrationCode = `
<script src="https://web-button.getmati.com/button.js">
</script>
<mati-button
  clientid="YOUR_CLIENT_ID"
  metadata="JSON_METADATA_STRING"
/>
`;

function SectionWrapper({ children, title }) {
  return (
    <Card shadow="0" padding="2/4">
      <H2>{title}</H2>
      <Items templateColumns="5fr 1fr">
        <Card shadow="0">
          {children}
        </Card>
      </Items>
    </Card>
  );
}

export default function InfoPage({
  application,
  webhook,
  setWebhook,
  removeWebhook,
}) {
  return (
    <Card padding="2/0" gap="0">
      <SectionWrapper
        title={<FormattedMessage id="apps.integration.documentation.title" />}
      >
        <DocumentationSection
          clientId={application.clientId}
          clientSecret={application.clientSecret}
        />
      </SectionWrapper>
      <HR />
      <SectionWrapper
        title={<FormattedMessage id="apps.integration.verify.title" />}
      >
        <APISection />
        <HR />
        <WebSDKSection integrationCode={integrationCode} />
        <HR />
        <MobileSDKSection />
        <HR />
        <PermalinkSection clientId={application.clientId} />
      </SectionWrapper>
      <HR />
      <SectionWrapper
        title={<FormattedMessage id="apps.integration.sync.title" />}
      >
        <WebhookDocumentationSection />
        <HR />
        <WebhookSection
          webhook={webhook}
          setWebhook={setWebhook}
          removeWebhook={removeWebhook}
        />
      </SectionWrapper>
    </Card>
  );
}

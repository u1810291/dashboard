import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Items, Card } from 'components';
import { HR, H2 } from 'components/text';

import {
  DocumentationSection,
  APISection,
  PermalinkSection,
  MobileSDKSection,
  WebSDKSection,
  WebhookDocumentationSection,
  WebhookSection,
} from './sections';

const integrationCode = `
<script src="https://web-button.mati.io/button.js">
</script>
<mati-button
  clientid="YOUR_CLIENT_ID"
  metadata="JSON_METADATA_STRING"
/>
`;

function SectionWrapper({ children }) {
  return (
    <Items templateColumns="5fr 1fr">
      <Items flow="row">
        {children}
      </Items>
    </Items>
  );
}

export function HeaderWrapper({ children }) {
  return (
    <Items templateColumns="2fr 3fr">
      <H2>{children}</H2>
    </Items>
  );
}

export default function InfoPage({
  application,
  webhook,
  hasProvider,
  setWebhook,
  removeWebhook,
}) {
  const token = useSelector((state) => state.auth.token);
  return (
    <Card>
      <SectionWrapper>
        <HeaderWrapper>
          <FormattedMessage id="apps.integration.documentation.title" />
        </HeaderWrapper>
        <DocumentationSection
          hasProvider={hasProvider}
          clientId={application.clientId}
          clientSecret={application.clientSecret}
          matiToken={token}
        />
      </SectionWrapper>
      <HR />
      <SectionWrapper>
        <HeaderWrapper>
          <FormattedMessage id="apps.integration.verify.title" />
        </HeaderWrapper>
        <APISection />
        <WebSDKSection integrationCode={integrationCode} />
        <MobileSDKSection />
        <PermalinkSection clientId={application.clientId} />
      </SectionWrapper>
      <HR />
      <SectionWrapper>
        <HeaderWrapper>
          <FormattedMessage id="apps.integration.sync.title" />
        </HeaderWrapper>
        <WebhookDocumentationSection />
        <WebhookSection
          webhook={webhook}
          setWebhook={setWebhook}
          removeWebhook={removeWebhook}
        />
      </SectionWrapper>
    </Card>
  );
}

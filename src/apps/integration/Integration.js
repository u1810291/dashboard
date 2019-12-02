import { Divider, Paper } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { SubDivider } from './Integration.styles';
import { IntegrationSection } from './IntegrationSection';
import { APISection, DocumentationSection, MobileSDKSection, PermalinkSection, WebhookDocumentationSection, WebhookSection, WebSDKSection } from './sections';

export function Integration({ clientId, clientSecret }) {
  const intl = useIntl();

  return (
    <Paper>
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.documentation.title' })}>
        <DocumentationSection
          clientId={clientId}
          clientSecret={clientSecret}
        />
      </IntegrationSection>
      <Divider variant="fullWidth" />
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.verify.title' })}>
        <APISection />
        <SubDivider />
        <WebSDKSection />
        <SubDivider />
        <MobileSDKSection />
        <SubDivider />
        <PermalinkSection clientId={clientId} />
      </IntegrationSection>
      <Divider variant="fullWidth" />
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.sync.title' })}>
        <WebhookDocumentationSection />
        <SubDivider />
        <WebhookSection clientId={clientId} />
      </IntegrationSection>
    </Paper>
  );
}

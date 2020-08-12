import { Box, Divider } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { IntegrationSection } from '../IntegrationSection/IntegrationSection';
import { SectionAPI } from '../SectionAPI/APISection';
import { SectionDocumentation } from '../SectionDocumentation/DocumentationSection';
import { SectionMobileSDK } from '../SectionMobileSDK/SectionMobileSDK';
import { SectionPermalink } from '../SectionPermalink/SectionPermalink';
import { SectionWebhook } from '../SectionWebhook/SectionWebhook';
import { SectionWebhookDocumentation } from '../SectionWebhookDocumentation/SectionWebhookDocumentation';
import { SectionWebSDK } from '../SectionWebSDK/SectionWebSDK';
import { SubDivider } from './Integration.styles';

export function Integration() {
  const intl = useIntl();

  return (
    <Box>
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.documentation.title' })}>
        <SectionDocumentation />
      </IntegrationSection>
      <Divider variant="fullWidth" />
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.verify.title' })}>
        <SectionAPI />
        <SubDivider />
        <SectionWebSDK />
        <SubDivider />
        <SectionMobileSDK />
        <SubDivider />
        <SectionPermalink />
      </IntegrationSection>
      <Divider variant="fullWidth" />
      <IntegrationSection title={intl.formatMessage({ id: 'apps.integration.sync.title' })}>
        <SectionWebhookDocumentation />
        <SubDivider />
        <SectionWebhook />
      </IntegrationSection>
    </Box>
  );
}

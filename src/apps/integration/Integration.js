import React from 'react';
import { Items } from 'components';
import {
  LetsStartPanel,
  VerificationPanel,
  ApplicationsPanel,
  InstallFrontendCodePanel,
  SetWebhooksPanel,
} from 'fragments/integration/installation-guide-panels';
import IntegrationLayout from './IntegrationLayout';

export default function Info() {
  return (
    <IntegrationLayout>
      <main>
        <Items flow="row">
          <LetsStartPanel />
          <VerificationPanel />
          <ApplicationsPanel />
          <InstallFrontendCodePanel />
          <SetWebhooksPanel />
        </Items>
      </main>
    </IntegrationLayout>
  );
}

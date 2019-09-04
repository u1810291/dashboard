import React from 'react';
import { Items } from 'components';
import {
  InstallFrontendCodePanelIntegration,
  LetsStartPanelIntegration,
  SetWebhooksPanelIntegration,
} from 'fragments/integration/installation-guide-panels';
import Webhooks from './Webhooks';

import CSS from './IntegrationContent.module.scss';

export default function InfoPage() {
  return (
    <Items flow="row" className={CSS.aside}>
      <LetsStartPanelIntegration />
      <InstallFrontendCodePanelIntegration />
      <SetWebhooksPanelIntegration />
      <Webhooks />
    </Items>
  );
}

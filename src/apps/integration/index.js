import React from 'react'
import { Items, Card } from 'components'
import {
  InstallFrontendCodePanelIntegration,
  LetsStartPanelIntegration,
  SetWebhooksPanelIntegration,
} from 'fragments/integration/installation-guide-panels';
import Webhooks from './Webhooks'
import MobileDemo from './MobileDemo'
import ClientApplications from './ClientApplications'
import IntegrationCode from './IntegrationCode'

import CSS from './IntegrationContent.module.scss'

export default function InfoPage() {
  return (
    <Items
      flow="column"
      gap={2}
      templateColumns="1.5fr 1fr"
      className={CSS.integrationContent}
    >
     <Items flow="row">
       <Card>
         <IntegrationCode />
         <hr/>
         <ClientApplications />
         <hr/>
         <MobileDemo />
       </Card>
     </Items>
     <Items flow="row">
       <LetsStartPanelIntegration />
       <InstallFrontendCodePanelIntegration />
       <SetWebhooksPanelIntegration />
       <Webhooks />
     </Items>
    </Items>
  )
}

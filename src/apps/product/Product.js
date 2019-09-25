import React, { useState } from 'react';
import { Content, Tab } from 'components';
import Integration from 'apps/integration';
import {
  Configuration,
  MatiButtonAside,
} from 'apps/configuration';
import IntegrationAside from 'apps/integration/IntegrationAside';
import { trackEvent } from 'lib/mixpanel';
import LegalServices from 'fragments/product/legal-services';
import Badge from './Badge';

export default function Product() {
  const [activeTabIndex, changeActiveTab] = useState(0);
  const tabs = [
    {
      tab: 'Product.tab.customization',
    },
    {
      tab: 'Product.tab.integration',
    },
    {
      tab: 'Product.LegalService.tab',
      badge: <Badge label="Beta" />,
    },
  ];

  const changeActiveTabHandler = (props) => {
    if (tabs[props].tab.includes('integration')) {
      trackEvent('merchant_clicked_integration_tab');
    }
    if (tabs[props].tab.includes('LegalService')) {
      trackEvent('merchant_clicked_legal_services_tab');
    }
    changeActiveTab(props);
  };

  return (
    <Content>
      <Tab
        withAside
        padding={2}
        active={activeTabIndex}
        onClick={changeActiveTabHandler}
        tabs={tabs}
        contents={[<Configuration />, <Integration />, <LegalServices />]}
        aside={[<MatiButtonAside />, <IntegrationAside />, null]}
      />
    </Content>
  );
}

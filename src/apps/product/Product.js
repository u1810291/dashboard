import React, { useState } from 'react';
import { Content, Tab } from 'components';
import Integration from 'apps/integration';
import {
  Configuration,
  MatiButtonAside,
} from 'apps/configuration';
import IntegrationAside from 'apps/integration/IntegrationAside';
import { trackEvent } from 'lib/mixpanel';

export default function Product() {
  const [activeTabIndex, changeActiveTab] = useState(0);
  const tabs = ['Product.tab.customization', 'Product.tab.integration'];

  const changeActiveTabHandler = (props) => {
    if (tabs[props].includes('integration')) {
      trackEvent('merchant_clicked_integration_tab');
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
        contents={[<Configuration />, <Integration />]}
        aside={[<MatiButtonAside />, <IntegrationAside />]}
      />
    </Content>
  );
}

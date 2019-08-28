import React, { useState } from 'react';
import { Content, Tab } from 'components';
import Integration from 'apps/integration'
import {
  Configuration,
  MatiButtonAside
} from 'apps/configuration'
import IntegrationAside from 'apps/integration/IntegrationAside';

export default function Product() {
  const [activeTabIndex, changeActiveTab] = useState(0);

  return (
    <Content>
      <Tab
        withAside
        padding={2}
        active={activeTabIndex}
        onClick={changeActiveTab}
        tabs={['Product.tab.customization', 'Product.tab.integration']}
        contents={[<Configuration />, <Integration />]}
        aside={[<MatiButtonAside />, <IntegrationAside />]}
      />
    </Content>
  );
}

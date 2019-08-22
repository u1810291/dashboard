import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Content, Tab } from 'components';
import Integration from 'apps/integration'
import {
  Configuration,
  MatiButtonAside
} from 'apps/configuration'
import IntegrationAside from 'apps/integration/IntegrationAside';

export default function Product() {
  const [activeTabIndex, changeActiveTab] = useState(0);
  const { merchantPlan } = useSelector(s => s.merchant.billing);
  const hasPlan = merchantPlan && merchantPlan.activatedAt;

  return (
    <Content>
      <Tab
        withAside
        padding={2}
        active={activeTabIndex}
        onClick={changeActiveTab}
        tabs={hasPlan ?
          ['Product.tab.customization', 'Product.tab.integration'] :
          ['Product.tab.customization']
        }
        contents={hasPlan ?
          [<Configuration />, <Integration />] :
          [<Configuration />]
        }
        aside={hasPlan ?
          [<MatiButtonAside />, <IntegrationAside />] :
          [<MatiButtonAside />]
        }
      />
    </Content>
  );
}

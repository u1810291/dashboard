import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content, Tab } from 'components';
import Integration from 'apps/integration'
import {
  Configuration,
  MatiButtonAside
} from 'apps/configuration'
import IntegrationAside from 'apps/integration/IntegrationAside';
import { getMerchantPlan } from 'state/plans';

export default function Product() {
  const [activeTabIndex, changeActiveTab] = useState(0);
  const { token } = useSelector(s => s.auth);
  const [hasPlan, setHasPlan] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMerchantPlan(token),
    ).then(({ data: { planDetails } }) => {
      setHasPlan(!!planDetails.activatedAt);
    })
  }, [token, dispatch]);

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

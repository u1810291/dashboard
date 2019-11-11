import React, { useState, useEffect, useCallback } from 'react';
import { get, last } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getMerchantApps } from 'state/merchant/merchant.actions';
import { subscribeToWebhook, getWebhooks, deleteWebhook } from 'state/webhooks/webhooks.actions';
import useMerchantBilling from 'hooks/useMerchantBilling';
import { Content, Tab, Items } from 'components';
import Integration from 'apps/integration';
import { Configuration, MatiButtonAside } from 'apps/configuration';
import { trackEvent } from 'lib/mixpanel';
import LegalServices from 'fragments/product/legal-services';
import Badge from './Badge';
import Footer from './Footer';
import CompanyBar from './CompanyBar';

export default function Product() {
  const dispatch = useDispatch();
  const { clientId, clientSecret } = useSelector(
    (s) => last(s.merchant.apps) || {},
  );
  const { hasProvider } = useMerchantBilling();
  const webhook = useSelector((s) => last(s.webhooks.webhooks[clientId]) || {});
  const setWebhook = useCallback(
    async (url, secret) => {
      if (webhook.id) {
        await dispatch(deleteWebhook(clientId, webhook.id));
      }
      await dispatch(subscribeToWebhook(clientId, { url, secret }));
      return dispatch(getWebhooks(clientId));
    },
    [dispatch, clientId, webhook.id],
  );
  const removeWebhook = useCallback(
    async () => {
      await dispatch(deleteWebhook(clientId, webhook.id));
      return dispatch(getWebhooks(clientId));
    },
    [dispatch, clientId, webhook.id],
  );

  useEffect(() => {
    dispatch(getMerchantApps());
  }, [dispatch]);

  useEffect(() => {
    if (clientId) {
      dispatch(getWebhooks(clientId));
    }
  }, [dispatch, clientId]);

  const companyName = useSelector((state) => get(state, 'merchant.configurations.dashboard.info.organization'),
  );
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
    <>
      <Content>
        <Items flow="row">
          <CompanyBar companyName={companyName} clientId={clientId} />
          <Tab
            withAside
            padding={2}
            active={activeTabIndex}
            onClick={changeActiveTabHandler}
            tabs={tabs}
            contents={[
              <Configuration />,
              <Integration
                hasProvider={hasProvider}
                application={{ clientId, clientSecret }}
                webhook={webhook}
                setWebhook={setWebhook}
                removeWebhook={removeWebhook}
              />,
              <LegalServices />,
            ]}
            aside={[
              <MatiButtonAside
                goToComplianceSection={() => changeActiveTabHandler(2)}
              />,
            ]}
          />
        </Items>
      </Content>
      <Footer />
    </>
  );
}

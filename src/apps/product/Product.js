import React, { useState, useEffect, useCallback } from 'react';
import { get, last } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getMerchantApps } from 'state/merchant';
import { subscribeToWebhook, getWebhooks, deleteWebhook } from 'state/webhooks';
import useMerchantBilling from 'hooks/useMerchantBilling';
import { Content, Tab, Items, Card, H2, Link } from 'components';
import { CopyToClipboard } from 'components/clipboard';
import Integration from 'apps/integration';
import { Configuration, MatiButtonAside } from 'apps/configuration';
import { trackEvent } from 'lib/mixpanel';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import LegalServices from 'fragments/product/legal-services';
import Badge from './Badge';

export default function Product() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { clientId, clientSecret } = useSelector(
    (s) => last(s.merchant.apps) || {},
  );
  const { hasProvider } = useMerchantBilling();
  const webhook = useSelector((s) => last(s.webhooks.webhooks[clientId]) || {});
  const setWebhook = useCallback(
    async (url, secret) => {
      await dispatch(subscribeToWebhook(token, clientId, { url, secret }));
      return dispatch(getWebhooks(token, clientId));
    },
    [dispatch, token, clientId],
  );
  const removeWebhook = useCallback(
    async () => {
      await dispatch(deleteWebhook(token, clientId, webhook.id));
      return dispatch(getWebhooks(token, clientId));
    },
    [dispatch, token, clientId, webhook.id],
  );
  useEffect(() => {
    dispatch(getMerchantApps(token));
  }, [dispatch, token]);
  useEffect(
    () => {
      if (clientId) {
        dispatch(getWebhooks(token, clientId));
      }
    },
    [dispatch, token, clientId],
  );

  const companyName = useSelector((state) => get(state, 'merchant.configuration.dashboard.info.organization'),
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
    <Content>
      <Items flow="row">
        <Card flow="column" align="center" autoColumns="1fr max-content">
          <H2>{companyName}</H2>
          <CopyToClipboard text={clientId}>
            <Link
              href={permalinkUrl({ clientId })}
              target="_blank"
              rel="noopener noreferrer"
            >
              {trimMiddle(permalinkUrl({ clientId }))}
            </Link>
          </CopyToClipboard>
        </Card>
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
  );
}

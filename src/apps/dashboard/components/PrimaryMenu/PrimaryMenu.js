import { Menu } from 'apps/layout';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';

export function PrimaryMenu({ isOwner = false, ...props }) {
  const intl = useIntl();

  const entries = [
    {
      id: 'product',
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      handler: () => trackEvent(MixPanelEvents.NavProduct),
      qa: QATags.Navigation.Top.Product,
    },
    {
      id: 'metrics',
      show: isOwner,
      to: '/metrics',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      handler: () => trackEvent(MixPanelEvents.NavMetrics),
      qa: QATags.Navigation.Top.Metrics,
    },
    {
      id: 'identities',
      to: '/identities',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      handler: () => trackEvent(MixPanelEvents.NavVerificationList),
      qa: QATags.Navigation.Top.VerificationList,
    },
  ];

  return <Menu entries={entries} {...props} />;
}

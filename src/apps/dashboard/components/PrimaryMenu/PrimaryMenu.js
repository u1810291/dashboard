import { Menu } from 'apps/layout';
import MatiLogo from 'assets/header-mati-logo.png';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './PrimaryMenu.styles';

export function PrimaryMenu({ isOwner = false, reviewCount }) {
  const intl = useIntl();
  const classes = useStyles();

  const entries = [
    {
      id: 'logo',
      to: isOwner ? '/' : '/identities',
      className: classes.logoItem,
      children: <img src={MatiLogo} alt="Mati" className={classes.logo} />,
      qa: QATags.Navigation.Top.Logo,
    },
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
      badge: reviewCount.value.count,
      handler: () => trackEvent(MixPanelEvents.NavVerificationList),
      qa: QATags.Navigation.Top.VerificationList,
    },
  ];

  return <Menu entries={entries} />;
}

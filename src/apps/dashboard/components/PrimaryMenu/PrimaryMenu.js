import { Menu } from 'apps/layout';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { filterUpdate, identitiesFilteredCountLoad, identitiesListLoad } from 'state/identities/identities.actions';
import { initialFilter } from 'apps/identity';
import { FiList, FiBarChart2, FiUserCheck } from 'react-icons/fi';

export function PrimaryMenu({ isOwner = false, ...props }) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const entries = [
    {
      id: 'metrics',
      show: isOwner,
      to: '/metrics',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      handler: () => trackEvent(MixPanelEvents.NavMetrics),
      icon: <FiBarChart2 />,
      qa: QATags.Navigation.Top.Metrics,
    },
    {
      id: 'identities',
      to: '/identities',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      handler: () => {
        trackEvent(MixPanelEvents.NavVerificationList);
        dispatch(filterUpdate(initialFilter));
        dispatch(identitiesListLoad());
        dispatch(identitiesFilteredCountLoad());
      },
      icon: <FiList />,
      qa: QATags.Navigation.Top.VerificationList,
    },
    {
      id: 'product',
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      handler: () => trackEvent(MixPanelEvents.NavProduct),
      icon: <FiUserCheck />,
      qa: QATags.Navigation.Top.Product,
    },
  ];

  return <Menu entries={entries} {...props} />;
}

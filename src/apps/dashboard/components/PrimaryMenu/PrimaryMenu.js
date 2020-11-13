import { initialFilter } from 'apps/identity';
import { Menu } from 'apps/layout';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiBarChart2, FiList, FiUserCheck, FiCode } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { filterUpdate, identitiesFilteredCountLoad, identitiesListLoad } from 'state/identities/identities.actions';
import { Routes } from '../../../../models/Router.model';

export function PrimaryMenu({ isOwner = false, ...props }) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const entries = [
    {
      id: 'metrics',
      show: isOwner,
      to: Routes.analytics.root,
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      handler: () => trackEvent(MixPanelEvents.NavMetrics),
      icon: <FiBarChart2 />,
      qa: QATags.Navigation.Top.Metrics,
    },
    {
      id: 'identities',
      to: Routes.list.root,
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
      to: Routes.flows.root,
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      handler: () => trackEvent(MixPanelEvents.NavProduct),
      icon: <FiUserCheck />,
      qa: QATags.Navigation.Top.Product,
    },
    {
      id: 'forDevelopers',
      show: isOwner,
      to: Routes.dev.root,
      label: intl.formatMessage({ id: 'dashboard.menu.developers' }),
      handler: () => trackEvent(MixPanelEvents.NavForDevelopers),
      icon: <FiCode />,
      qa: QATags.Navigation.Top.ForDevelopers,
    },
  ];

  return <Menu entries={entries} {...props} />;
}

import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiCode, FiList, FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function PrimaryMenu({ isOwner = false, ...props }) {
  const intl = useIntl();

  const entries = [
    // TODO: enable when analytics will be fixed
    /* {
      id: 'metrics',
      show: isOwner,
      to: Routes.analytics.root,
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      icon: <FiBarChart2 />,
      qa: QATags.Menu.Metrics,
    }, */
    {
      id: 'identities',
      to: Routes.list.root,
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      icon: <FiList />,
      qa: QATags.Menu.VerificationList,
    },
    {
      id: 'product',
      show: isOwner,
      to: Routes.flows.root,
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      icon: <FiUserCheck />,
      qa: QATags.Menu.Product,
    },
    {
      id: 'forDevelopers',
      show: isOwner,
      to: Routes.dev.root,
      label: intl.formatMessage({ id: 'dashboard.menu.developers' }),
      icon: <FiCode />,
      qa: QATags.Menu.ForDevelopers,
    },
  ];

  return <Menu entries={entries} {...props} />;
}

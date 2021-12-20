import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import { Routes } from 'models/Router.model';
import React from 'react';
import { FiBarChart2, FiCode, FiList, FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { IS_IDENTITY_PROFILE_RELEASED } from 'models/Release.model';

export function PrimaryMenu({ isOwner = false, ...props }) {
  const intl = useIntl();

  const entries = [
    {
      id: 'metrics',
      show: isOwner,
      to: Routes.analytics.root,
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      icon: <FiBarChart2 />,
      qa: QATags.Menu.Metrics,
    },
    {
      id: 'verifications',
      to: IS_IDENTITY_PROFILE_RELEASED ? Routes.identity.verification.root : Routes.list.root,
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      icon: <FiList />,
      qa: QATags.Menu.VerificationList,
    },
    {
      id: 'flows',
      show: isOwner,
      to: Routes.flow.root,
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

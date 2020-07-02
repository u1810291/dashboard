import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiInfo, FiUser } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function SecondaryMenu() {
  const intl = useIntl();

  const entries = [
    {
      id: 'faq',
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.faq' }),
      icon: <FiInfo />,
      qa: QATags.Navigation.Top.FAQ,
    },
    {
      id: 'account',
      to: '/settings',
      label: intl.formatMessage({ id: 'dashboard.menu.account' }),
      icon: <FiUser />,
      qa: QATags.Navigation.Top.Account,
    },
  ];

  return <Menu entries={entries} />;
}

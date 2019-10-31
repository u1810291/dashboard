import { Menu } from 'apps/navigation';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiUser, FiInfo } from 'react-icons/fi';

export default function SecondaryMenu() {
  const intl = useIntl();

  const entries = [
    {
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.faq' }),
      icon: <FiInfo />,
    },
    {
      to: '/settings',
      label: intl.formatMessage({ id: 'dashboard.menu.account' }),
      icon: <FiUser />,
    },
  ];


  return <Menu entries={entries} />;
}

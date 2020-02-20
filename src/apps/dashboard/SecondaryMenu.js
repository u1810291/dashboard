import { Menu } from 'apps/navigation';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiUser, FiInfo } from 'react-icons/fi';

export function SecondaryMenu() {
  const intl = useIntl();

  const entries = [
    {
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.faq' }),
      icon: <FiInfo />,
      qa: QATags.Navigation.Top.FAQ,
    },
    {
      to: '/settings',
      label: intl.formatMessage({ id: 'dashboard.menu.account' }),
      icon: <FiUser />,
      qa: QATags.Navigation.Top.Account,
    },
  ];


  return <Menu entries={entries} />;
}

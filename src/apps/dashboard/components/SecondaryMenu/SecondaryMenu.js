import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';

export function SecondaryMenu(props) {
  const intl = useIntl();

  const entries = [
    {
      id: 'faq',
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.faq' }),
      icon: <FiHelpCircle />,
      qa: QATags.Navigation.Top.FAQ,
    },
  ];

  return <Menu entries={entries} {...props} />;
}

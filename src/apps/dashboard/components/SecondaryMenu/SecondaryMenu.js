import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiGift, FiHelpCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { appPalette } from 'apps/theme/app.palette';
import { Routes } from 'models/Router.model';

export function SecondaryMenu({ isOpen, ...props }) {
  const intl = useIntl();

  const handlerGoToWhatsUp = useCallback(() => {
    window.open('https://update.dashboard.getmati.com/en?role=registered', '_blank');
  }, []);

  const [entries] = useState([{
    id: 'faq',
    to: Routes.info.root,
    label: intl.formatMessage({ id: 'dashboard.menu.faq' }),
    icon: <FiHelpCircle />,
    qa: QATags.Menu.FAQ,
    color: appPalette.black7,
  },
  {
    id: 'whatsUp',
    label: intl.formatMessage({ id: 'dashboard.menu.whatsNew' }),
    icon: <FiGift />,
    color: appPalette.red,
    handler: handlerGoToWhatsUp,
    isOutlined: true,
    qa: QATags.Menu.WhatsNew,
  }]);
  const [isWithOutlined] = useState(entries.some((item) => item?.isOutlined));

  return <Menu entries={entries} {...props} isOpen={isOpen} isWithOutlined={isWithOutlined} />;
}

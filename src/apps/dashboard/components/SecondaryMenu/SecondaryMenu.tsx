import { Menu } from 'apps/layout';
import { QATags } from 'models/QA.model';
import React, { useMemo } from 'react';
import { FiGift, FiHelpCircle, FiMessageSquare } from 'react-icons/fi';
import { appPalette } from 'apps/theme/app.palette';
import { useFormatMessage } from 'apps/intl';
import { Routes } from 'models/Router.model';
import { BeamerSelectorId } from 'apps/beamer';

export function SecondaryMenu({ isOpen, isOwner, ...props }: { isOpen: boolean; isOwner: boolean}) {
  const formatMessage = useFormatMessage();

  const entries = useMemo(() => [{
    id: 'helpCenter',
    to: Routes.info.root,
    label: formatMessage('dashboard.menu.helpCenter'),
    icon: <FiHelpCircle />,
    qa: QATags.Menu.FAQ,
    color: appPalette.black7,
  },
  {
    id: 'roadmap',
    show: isOwner,
    to: Routes.productBoard.root,
    label: formatMessage('dashboard.menu.feedbackBoard'),
    icon: <FiMessageSquare />,
    qa: QATags.Menu.ProductBoard,
  },
  {
    id: BeamerSelectorId,
    label: formatMessage('dashboard.menu.whatsNew'),
    icon: <FiGift />,
    color: appPalette.red,
    isOutlined: true,
    qa: QATags.Menu.WhatsNew,
  }], [formatMessage, isOwner]);

  return <Menu entries={entries} {...props} isOpen={isOpen} />;
}

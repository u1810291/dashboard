import React from 'react';
import classNames from 'classnames';

import CSS from './ApplicationMenu.module.scss';

export default function MenuItemSpacer() {
  return (
    <span
      className={classNames(CSS.menuItemSpacer, CSS.menuItem, 'no-active')}
    />
  );
}

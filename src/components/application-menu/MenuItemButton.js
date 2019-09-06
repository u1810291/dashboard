import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import CSS from './ApplicationMenu.module.scss';

export default function MenuItemButton({
  children,
  label,
  icon,
  ...buttonProps
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span className={classNames(CSS.menuItem)} {...buttonProps}>
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span>{label}</span>}
      {children}
    </span>
  );
}

MenuItemButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
};

MenuItemButton.defaultProps = {
  icon: '',
  label: '',
};

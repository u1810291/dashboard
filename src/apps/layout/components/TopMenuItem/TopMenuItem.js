import { Box, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles, MenuBadge } from './TopMenuItem.styles';

function calcWidth(str, base, step = 3, maxChars = 4) {
  return (base + step * String(str).substr(0, maxChars).length);
}

export function TopMenuItem({
  children,
  className,
  label,
  badge = 0,
  isNoLink = false,
  show = true,
  to,
  handler,
  icon,
  qa,
}) {
  const classes = useStyles();

  const menuItem = (
    <MenuItem
      divider={false}
      className={clsx(classes.menuItem, className)}
      onClick={handler}
      data-qa={qa}
      style={{ paddingRight: calcWidth(badge, 15) }}
    >
      {icon && <Box mr={1} display="flex">{icon}</Box>}
      {children}
      <MenuBadge badgeContent={badge} max={999}>
        <Box style={{ marginRight: calcWidth(badge, 12) }}>{label}</Box>
      </MenuBadge>
    </MenuItem>
  );

  if (isNoLink || !to) {
    return !!show && menuItem;
  }

  return !!show && (
    <NavLink
      exact
      to={to}
      activeClassName="active"
      data-qa={qa}
    >
      {menuItem}
    </NavLink>
  );
}

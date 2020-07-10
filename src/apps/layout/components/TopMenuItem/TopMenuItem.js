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
  badge,
  isNoLink = false,
  show = true,
  to,
  handler,
  icon,
  qa,
  color,
  isActive = true,
  isMobile = false,
}) {
  const classes = useStyles();

  const menuItem = (
    <MenuItem
      divider={false}
      className={clsx(classes.menuItem, className)}
      onClick={handler}
      data-qa={qa}
    >
      {icon && <Box mr={1} display="flex" color={color}>{icon}</Box>}
      {children}
      {badge
        ? (
          <MenuBadge badgeContent={badge} max={999}>
            <Box color={color} style={{ marginRight: calcWidth(badge, 12) }}>{label}</Box>
          </MenuBadge>
        )
        : <Box color={color}>{label}</Box>}
    </MenuItem>
  );

  if (isNoLink || !to) {
    return !!show && menuItem;
  }

  return !!show && (
    <NavLink
      exact
      to={to}
      activeClassName={isActive
        ? (isMobile ? classes.mobileActive : classes.desktopActive)
        : null}
      data-qa={qa}
    >
      {menuItem}
    </NavLink>
  );
}

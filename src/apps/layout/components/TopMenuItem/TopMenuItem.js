import { Box, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from './TopMenuItem.styles';

export function TopMenuItem({
  children,
  className,
  label,
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
      {icon && <Box mr={2} display="flex" color={color} fontSize={17}>{icon}</Box>}
      {children}
      <Box color={color} display="flex">
        {label}
      </Box>
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

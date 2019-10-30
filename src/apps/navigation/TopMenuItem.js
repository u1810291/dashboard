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
}) {
  const classes = useStyles();

  const menuItem = (
    <MenuItem
      divider={false}
      className={clsx(classes.menuItem, className)}
      onClick={handler}
    >
      {icon && <Box mr={1} display="flex">{icon}</Box>}
      {label}
      {children}
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
    >
      {menuItem}
    </NavLink>
  );
}

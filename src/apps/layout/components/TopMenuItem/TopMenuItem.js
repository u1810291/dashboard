import { Box, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'apps/ui';
import { useStyles } from './TopMenuItem.styles';

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
      <Box color={color} display="flex">
        <Box>
          {label}
        </Box>
        {badge && (
          <Box ml={1}>
            <Badge>
              {+badge > 999 ? 999 : badge}
            </Badge>
          </Box>
        )}
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

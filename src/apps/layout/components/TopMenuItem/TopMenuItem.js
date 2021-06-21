import { Box, MenuItem } from '@material-ui/core';
import classnames from 'classnames';
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
  isOutlined = false,
  isWithOutlined = false,
  isOpen = false,
}) {
  const classes = useStyles({ color });
  const menuItem = (
    <MenuItem
      divider={false}
      className={classnames(classes.menuItem, className)}
      onClick={handler}
      data-qa={qa}
    >
      <Box
        display="flex"
        alignItems="center"
        className={classnames({
          [classes.outlined]: isOutlined && isOpen,
          [classes.withOutlinedPadding]: (isWithOutlined || isOutlined) && isOpen,
        })}
      >
        <Box display="flex" alignItems="center">
          {icon && (
          <Box
            mr={2}
            display="flex"
            className={classnames({ [classes.icon]: isOutlined && !isOpen })}
            color={color}
            fontSize={17}
          >
            {icon}
          </Box>
          )}
          {children}
          <Box className={classes.textBox} display="flex">
            {label}
          </Box>
        </Box>
      </Box>
    </MenuItem>
  );

  if (isNoLink || !to) {
    return !!show && menuItem;
  }

  const mobileClasses = isMobile ? classes.mobileActive : classes.desktopActive;

  return !!show && (
    <NavLink
      exact
      to={to}
      activeClassName={isActive ? mobileClasses : null}
      data-qa={qa}
    >
      {menuItem}
    </NavLink>
  );
}

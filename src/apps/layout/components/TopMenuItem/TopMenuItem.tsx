import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
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
  isOpen = false,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  isNoLink?: boolean;
  show?: boolean;
  to?: string;
  handler?: () => void;
  icon?: React.ReactNode;
  qa: string;
  color?: string;
  isActive?: boolean;
  isMobile?: boolean;
  isOutlined?: boolean;
  isOpen?: boolean;
  id: string;
}) {
  const classes = useStyles({ color });
  const menuItem = (
    <MenuItem
      divider={false}
      className={classnames(classes.menuItem, className, {
        [classes.withOutlinedPadding]: isOutlined && isOpen,
      })}
      onClick={handler}
      data-qa={qa}
      id={id}
    >
      <Box
        display="flex"
        alignItems="center"
        className={classnames({
          [classes.outlined]: isOutlined && isOpen,
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
          <Box className={classes.textBox} display="flex">
            {label}
          </Box>
          {children}
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

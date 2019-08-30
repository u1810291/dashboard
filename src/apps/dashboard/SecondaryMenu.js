import React from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { default as useStyles } from './styles'

export default function SecondaryMenu({ isOwner }) {
  const intl = useIntl();
  const classes = useStyles();

  const secondaryMenuEntries = [
    {
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.info' })
    },
    {
      to: '/settings',
      label: intl.formatMessage({ id: 'dashboard.menu.account' })
    },
  ];
  
  const Menu = ({ entries }) => 
    <>
      { entries.map(({
          show = true,
          ...props
        }, idx) => !!show &&
          <NavLink
            exact
            key={idx}
            to={props.to}
            activeClassName={ clsx('active', { [classes.activeItem]: !props.logo }) }
          >
            <MenuItem divider={false} className={clsx(classes.menuItem, props.className)}>
              {props.label}
              {props.children}
            </MenuItem>
          </NavLink>
        )}
    </>
  
  return <Menu entries={secondaryMenuEntries} />
}

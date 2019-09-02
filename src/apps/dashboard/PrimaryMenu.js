import React from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import MatiLogo from 'assets/header-mati-logo.png';
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { default as useStyles } from './styles'

export default function PrimaryMenu({ isOwner }) {
  const intl = useIntl();
  const classes = useStyles();

  const primaryMenuEntries = [
    {
      to: isOwner ? '/' : '/verifications',
      logo: true,
      noActive: true,
      className: classes.logoItem,
      children: <img src={ MatiLogo } alt="Mati" className={classes.logo} />
    },
    {
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' })
    },
    {
      show: isOwner,
      to: '/product',
      label: intl.formatMessage({ id: 'dashboard.menu.product' })
    },
    {
      to: '/verifications',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' })
    },
  ];
  
  const PrimaryMenu = ({ entries }) => 
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
  
  return <PrimaryMenu entries={primaryMenuEntries} />
}

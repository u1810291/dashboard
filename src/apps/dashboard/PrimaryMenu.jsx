import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import MatiLogo from 'assets/header-mati-logo.png';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './styles';

export default function PrimaryMenu({ isOwner }) {
  const intl = useIntl();
  const classes = useStyles();

  const primaryMenuEntries = [
    {
      to: isOwner ? '/' : '/verifications',
      logo: true,
      noActive: true,
      className: classes.logoItem,
      children: <img src={MatiLogo} alt="Mati" className={classes.logo} />,
    },
    {
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
    },
    {
      show: isOwner,
      to: '/product',
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
    },
    {
      to: '/verifications',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
    },
  ];

  const Menu = ({ entries }) => (
    <>
      {
        entries.map(({
          children,
          className,
          label,
          logo,
          show = true,
          to,
        }, index) => !!show
          && (
          <NavLink
            exact
            key={index} // eslint-disable-line react/no-array-index-key
            to={to}
            activeClassName={clsx('active', { [classes.activeItem]: !logo })}
          >
            <MenuItem divider={false} className={clsx(classes.menuItem, className)}>
              {label}
              {children}
            </MenuItem>
          </NavLink>
          ),
        )
      }
    </>
  );

  Menu.propTypes = {
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        label: PropTypes.string,
        className: PropTypes.string,
        show: PropTypes.bool,
      }),
    ).isRequired,
  };

  return <Menu entries={primaryMenuEntries} />;
}

PrimaryMenu.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './styles';

export default function SecondaryMenu() {
  const intl = useIntl();
  const classes = useStyles();

  const secondaryMenuEntries = [
    {
      to: '/info',
      label: intl.formatMessage({ id: 'dashboard.menu.info' }),
    },
    {
      to: '/settings',
      label: intl.formatMessage({ id: 'dashboard.menu.account' }),
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
        }) => !!show
          && (
          <NavLink
            exact
            key={to}
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

  return <Menu entries={secondaryMenuEntries} />;
}

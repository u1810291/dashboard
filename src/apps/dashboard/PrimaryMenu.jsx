import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import MatiLogo from 'assets/header-mati-logo.png';
import MenuItem from '@material-ui/core/MenuItem';
import { trackEvent } from 'lib/mixpanel';
import useStyles from './styles';

export default function PrimaryMenu({ isOwner }) {
  const intl = useIntl();
  const classes = useStyles();

  const primaryMenuEntries = [
    {
      to: isOwner ? '/' : '/identities',
      logo: true,
      noActive: true,
      className: classes.logoItem,
      children: <img src={MatiLogo} alt="Mati" className={classes.logo} />,
    },
    {
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      handler: () => trackEvent('merchant_click_metrics_tab'),
    },
    {
      show: isOwner,
      to: '/product',
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      handler: () => trackEvent('merchant_click_product_tab'),
    },
    {
      to: '/identities',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      handler: () => trackEvent('merchant_click_verif_list_tab'),
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
          handler,
        }, index) => !!show
          && (
          <NavLink
            exact
            key={index} // eslint-disable-line react/no-array-index-key
            to={to}
            activeClassName={clsx('active', { [classes.activeItem]: !logo })}
          >
            <MenuItem
              divider={false}
              className={clsx(classes.menuItem, className)}
              onClick={handler}
            >
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

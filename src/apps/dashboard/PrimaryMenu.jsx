import { Menu } from 'apps/navigation';
import MatiLogo from 'assets/header-mati-logo.png';
import { trackEvent } from 'lib/mixpanel';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useStyles from './styles';

export default function PrimaryMenu({ isOwner }) {
  const intl = useIntl();
  const classes = useStyles();

  const entries = [
    {
      id: 'logo',
      to: isOwner ? '/' : '/identities',
      isNoLink: true,
      noActive: true,
      className: classes.logoItem,
      children: <img src={MatiLogo} alt="Mati" className={classes.logo} />,
    },
    {
      show: isOwner,
      to: '/',
      label: intl.formatMessage({ id: 'dashboard.menu.product' }),
      handler: () => trackEvent('merchant_click_product_tab'),
    },
    {
      show: isOwner,
      to: '/metrics',
      label: intl.formatMessage({ id: 'dashboard.menu.metrics' }),
      handler: () => trackEvent('merchant_click_metrics_tab'),
    },
    {
      to: '/identities',
      label: intl.formatMessage({ id: 'dashboard.menu.identities' }),
      handler: () => trackEvent('merchant_click_verif_list_tab'),
    },
  ];

  return <Menu entries={entries} />;
}

PrimaryMenu.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

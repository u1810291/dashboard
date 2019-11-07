import PropTypes from 'prop-types';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signOut } from 'state/auth/auth.actions';
import Button from 'components/button';
import { PageContentLayout, PageContentMenu } from 'components';
import confirm from 'components/confirm';
import Items from 'components/items';
import { ReactComponent as LogoutIcon } from './logout.svg';

// eslint-disable-next-line no-shadow
function SettingsLayout({ children, signOut, hasMerchantPlan, ...props }) {
  const billing = useSelector(
    ({ merchant = {} }) => merchant.billing && merchant.billing.providers,
  );
  const hasBillingPage = hasMerchantPlan || billing.length;

  const handleLogout = async () => {
    await confirm(<FormattedMessage id="confirm_string" />);
    signOut();
    window.location = '/';
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PageContentLayout {...props}>
      <PageContentMenu>
        <NavLink exact to="/settings">
          <FormattedMessage id="apps.settings.personalSettings" />
        </NavLink>
        <NavLink to="/settings/team">
          <FormattedMessage id="apps.settings.teamSettings" />
        </NavLink>
        <NavLink to="/settings/pricing">
          <FormattedMessage id="apps.settings.pricing" />
        </NavLink>
        {!!hasBillingPage && (
          <NavLink to="/settings/billing">
            <FormattedMessage id="apps.settings.billing" />
          </NavLink>
        )}
        <Button onClick={handleLogout}>
          <Items inline align="center">
            <FormattedMessage id="apps.settings.signout" />
            <LogoutIcon className="svg-active" />
          </Items>
        </Button>
      </PageContentMenu>
      {children}
    </PageContentLayout>
  );
}

SettingsLayout.propTypes = {
  hasMerchantPlan: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  signOut: PropTypes.func.isRequired,
};

SettingsLayout.defaultProps = {
  hasMerchantPlan: false,
};

export default connect(
  null,
  { signOut },
)(SettingsLayout);

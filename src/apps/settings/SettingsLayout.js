import React from 'react'
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { signOut } from 'state/auth'
import Button from 'components/button'
import { PageContentLayout, PageContentMenu } from 'components'
import confirm from 'components/confirm'
import Items from 'components/items'
import { ReactComponent as LogoutIcon } from './logout.svg'

function SettingsLayout({ children, signOut, hasMerchantPlan, ...props }) {
  const billing = useSelector(s => s.merchant.billing.providers);
  const hasBillingPage = hasMerchantPlan || billing.length;

  async function handleLogout() {
    await confirm(<FormattedMessage id="confirm_string" />)
    signOut()
    window.location = '/'
  }

  return (
    <PageContentLayout {...props}>
      <PageContentMenu>
        <NavLink exact to="/settings/personal">
          <FormattedMessage id="apps.settings.personalSettings" />
        </NavLink>
        <NavLink exact to="/settings">
          <FormattedMessage id="apps.settings.teamSettings" />
        </NavLink>
        <NavLink to="/settings/pricing">
          <FormattedMessage id="apps.settings.pricing" />
        </NavLink>
        {hasBillingPage && (
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
  )
}

export default connect(
  null,
  { signOut }
)(SettingsLayout)

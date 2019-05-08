import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { signOut } from 'state/auth'
import Button from 'components/button'
import { PageContentLayout, PageContentMenu } from 'components'
import confirm from 'components/confirm'
import Items from 'components/items'
import { ReactComponent as LogoutIcon } from './logout.svg'

function SettingsLayout({ children, signOut, ...props }) {
  async function handleLogout() {
    await confirm(<FormattedMessage id="confirm_string" />)
    signOut()
    window.location = '/'
  }

  return (
    <PageContentLayout {...props}>
      <PageContentMenu>
        <NavLink exact to="/settings">
          <FormattedMessage id="apps.settings.teamSettings" />
        </NavLink>
        <NavLink to="/settings/pricing">
          <FormattedMessage id="apps.settings.pricing" />
        </NavLink>
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

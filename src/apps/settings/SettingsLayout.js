import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { signOut } from 'src/state/auth'
import Button from 'src/components/button'
import PageContentLayout from 'src/components/page-content-layout'
import confirm from 'src/components/confirm'
import LogoutIcon from './logout.svg'

function SettingsLayout({ children, signOut }) {
  async function handleLogout() {
    await confirm(<FormattedMessage id="confirm_string" />)
    signOut()
    window.location = '/'
  }

  return (
    <PageContentLayout>
      <nav>
        <NavLink exact to="/settings">
          <FormattedMessage id="apps.settings.teamSettings" />
        </NavLink>
        <NavLink to="/settings/pricing">
          <FormattedMessage id="apps.settings.pricing" />
        </NavLink>
        <Button onClick={handleLogout}>
          <span className="mgi-items mgi-items--centered">
            <FormattedMessage id="apps.settings.signout" />
            <LogoutIcon className="svg-active" />
          </span>
        </Button>
      </nav>
      {children}
    </PageContentLayout>
  )
}

export default connect(
  null,
  { signOut }
)(SettingsLayout)

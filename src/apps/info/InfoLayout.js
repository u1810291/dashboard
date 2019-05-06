import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PageContentLayout from 'components/page-content-layout'

export default function InfoLayout({ children }) {
  return (
    <PageContentLayout>
      <nav>
        <NavLink to="/info" exact>
          <FormattedMessage id="apps.info.menu.info" />
        </NavLink>
        <NavLink to="/info/features" exact>
          <FormattedMessage id="apps.info.menu.features" />
        </NavLink>
      </nav>
      {children}
    </PageContentLayout>
  )
}

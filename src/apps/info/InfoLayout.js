import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PageContentLayout from 'src/components/page-content-layout'

export default function InfoLayout({ children }) {
  return (
    <PageContentLayout>
      <nav>
        <NavLink to="/info" exact>
          <FormattedMessage id="apps.info.menu.info" />
        </NavLink>
      </nav>
      {children}
    </PageContentLayout>
  )
}

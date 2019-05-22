import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { PageContentLayout, PageContentMenu } from 'components'

export default function InfoLayout({ children }) {
  return (
    <PageContentLayout>
      <PageContentMenu>
        <NavLink to="/info" exact>
          <FormattedMessage id="apps.info.menu.info" />
        </NavLink>
        <NavLink to="/info/features" exact>
          <FormattedMessage id="apps.info.menu.features" />
        </NavLink>
      </PageContentMenu>
      {children}
    </PageContentLayout>
  )
}

import React from 'react'
import CSS from './PageContentLayout.scss'

export default function PageContentLayout({ children }) {
  return <div className={CSS.pageContentLayout}>{children}</div>
}

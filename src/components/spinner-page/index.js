import React from 'react'
import { Content } from 'src/components/application-box'
import Spinner from 'src/components/spinner'
import CSS from './spinner-page.module.scss'

export default function() {
  return (
    <Content>
      <Spinner className={CSS.spinner} size="large" />
    </Content>
  )
}

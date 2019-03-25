import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'src/components/application-box'
import Info from './Info'

export default function InfoPage() {
  return (
    <Content>
      <Switch>
        <Route path="/info" component={Info} />
      </Switch>
    </Content>
  )
}

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import { Content } from 'components/application-box'
import Items from 'components/items'
import Info from './Info'
import Features from './Features'

export default function InfoPage() {
  return (
    <Content>
      <Items flow="row">
        <h1>
          <FormattedMessage id="apps.info.info.title" />
        </h1>
        <Switch>
          <Route path="/info/features" component={Features} />
          <Route path="/info" component={Info} />
        </Switch>
      </Items>
    </Content>
  )
}

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Onboarding } from '.'
import { NotFound } from 'src/apps/not-found'

export default function Dashboard(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/dashboard/onboarding" component={Onboarding} />
        <Redirect exact path="/dashboard" to="/dashboard/onboarding" />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  )
}

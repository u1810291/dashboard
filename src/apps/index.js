import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Auth } from './auth'
import { Dashboard } from './dashboard'
import { NotFound } from './not-found'

export default function Root() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  )
}
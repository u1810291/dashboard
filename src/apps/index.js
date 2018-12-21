import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Auth } from './auth'
import { Dashboard } from './dashboard'

export default class Root extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    )
  }
}

@connect(state => ({ loggedIn: state.auth.token }))
class PrivateRoute extends React.Component {
  render() {
    const { component: Component, loggedIn, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth/signin',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
}

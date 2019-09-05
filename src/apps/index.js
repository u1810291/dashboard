import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Auth from './auth';
import Dashboard from './dashboard';

export default function Root() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
}

function PrivateRouteComponent({ component: Component, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        loggedIn
          ? (
            <Component {...props} />
          )
          : (
            <Redirect
              to={{
                pathname: '/auth/signin',
                state: { from: props.location },
              }}
            />
          )
      )}
    />
  );
}

PrivateRouteComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
  loggedIn: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

const PrivateRoute = connect((state) => ({ loggedIn: state.auth.token }))(
  PrivateRouteComponent,
);

PrivateRouteComponent.defaultProps = {
  loggedIn: undefined,
};

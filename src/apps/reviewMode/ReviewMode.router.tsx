import { Routes } from 'models/Router.model';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReviewContainer } from './components/ReviewContainer/ReviewContainer';

export function ReviewModeRouter() {
  return (
    <Switch>
      <Route path={Routes.review.root} component={ReviewContainer} />
    </Switch>
  );
}

import { Routes } from 'models/Router.model';
import React from 'react';
import { Switch } from 'react-router-dom';
import { WithAgent } from 'models/Collaborator.model';
import { RoleGuardRoute } from 'apps/routing';
import { ReviewContainer } from './components/ReviewContainer/ReviewContainer';

export function ReviewModeRouter() {
  return (
    <Switch>
      <RoleGuardRoute roles={WithAgent} path={Routes.review.root} component={ReviewContainer} />
    </Switch>
  );
}

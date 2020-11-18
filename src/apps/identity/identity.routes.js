import React from 'react';
import { Route } from 'react-router-dom';
import { VerificationDetail } from './containers/VerificationDetail/VerificationDetail';
import { VerificationHistory } from './containers/VerificationHistory/VerificationHistory';
import { Routes } from '../../models/Router.model';

export const identityRoutes = [
  <Route key="demo" path={Routes.list.demo} component={VerificationDetail} />,
  <Route key="details" path={Routes.list.details} component={VerificationDetail} />,
  <Route key="list" exact path={Routes.list.root} component={VerificationHistory} />,
];

import React from 'react';
import { Route } from 'react-router-dom';
import { VerificationDetail } from './containers/VerificationDetail/VerificationDetail';
import { VerificationHistory } from './containers/VerificationHistory/VerificationHistory';

export const identityRoutes = [
  <Route key="demo" path="/identities/demo/:demoId" component={VerificationDetail} />,
  <Route key="details" path="/identities/:id" component={VerificationDetail} />,
  <Route key="list" exact path="/identities" component={VerificationHistory} />,
];

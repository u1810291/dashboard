import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { VerificationDetail } from './containers/VerificationDetail/VerificationDetail';
import { VerificationHistory } from './containers/VerificationHistory/VerificationHistory';

export function IdentityRouter() {
  return (
    <Switch>
      <Route path="/identities/demo/:demoId" component={VerificationDetail} />
      <Route path="/identities/:id" component={VerificationDetail} />
      <Route exact path="/identities" component={VerificationHistory} />
    </Switch>
  );
}

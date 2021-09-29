import { useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import { selectUserRole } from 'state/merchant/merchant.selectors';
import { Routes } from 'models/Router.model';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { RedirectWithLocation } from 'apps/routing/index';
import React from 'react';
import { IS_IDENTITY_PROFILE_RELEASED } from 'models/Release.model';
import { useLoadMerchant } from 'apps/merchant/hooks/loadMerchant.hook';
import { Loader } from 'apps/ui';

export function RoleGuardRoute({ path, roles, component, ...props }: {path: string; roles: CollaboratorRoles[]; component: React.ReactNode}) {
  const location = useLocation();
  const userRole = useSelector(selectUserRole);
  const isRequestedPath = location.pathname === path;
  const merchantModel = useLoadMerchant();

  if (merchantModel.isLoading || !merchantModel.isLoaded) {
    return (<Loader logoWithCompanyName />);
  }

  if (!roles || (isRequestedPath && !roles.includes(userRole))) {
    return (<RedirectWithLocation pathname={IS_IDENTITY_PROFILE_RELEASED ? Routes.identity.verification.root : Routes.list.root} />);
  }

  return (
    <Route path={path} component={component} {...props} />
  );
}

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'state/merchant/merchant.selectors';
import { Routes } from 'models/Router.model';
import { CollaboratorRoles } from 'models/Collaborator.model';
import { RedirectWithLocation } from 'apps/routing';
import { IS_IDENTITY_PROFILE_RELEASED } from 'models/Release.model';
import { Loader } from 'apps/ui';
import { useLoadMerchant } from 'apps/merchant/hooks/loadMerchant.hook';

export function RoleRoutingGuard({ roles, children }: {roles: CollaboratorRoles[]; children: React.ReactNode}) {
  const userRole = useSelector(selectUserRole);
  const merchantModel = useLoadMerchant();

  if (merchantModel.isLoading || !merchantModel.isLoaded) {
    return (<Loader logoWithCompanyName />);
  }

  if (!roles || !userRole || !roles.includes(userRole)) {
    return (<RedirectWithLocation pathname={IS_IDENTITY_PROFILE_RELEASED ? Routes.identity.verification.root : Routes.list.root} />);
  }

  return children;
}

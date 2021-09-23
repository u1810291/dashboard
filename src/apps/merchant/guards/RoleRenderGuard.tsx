import { CollaboratorRoles } from 'models/Collaborator.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'state/merchant/merchant.selectors';

export function RoleRenderGuard({ roles, children }: {roles: CollaboratorRoles[]; children: React.ReactElement}) {
  const userRole = useSelector(selectUserRole);

  if (!roles || !userRole || !roles.includes(userRole)) {
    return null;
  }

  return children;
}

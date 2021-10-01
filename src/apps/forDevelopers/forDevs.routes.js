import React, { lazy } from 'react';
import { Routes } from 'models/Router.model';
import { RoleGuardRoute } from 'apps/routing';
import { CollaboratorRoles } from 'models/Collaborator.model';

const ForDevsLazy = lazy(async () => {
  const { ForDevs } = await import('./containers/ForDev/ForDevs');
  return { default: ForDevs };
});

export const forDevsRoutes = [
  <RoleGuardRoute key="dev" path={Routes.dev.root} component={ForDevsLazy} roles={[CollaboratorRoles.ADMIN]} />,
];

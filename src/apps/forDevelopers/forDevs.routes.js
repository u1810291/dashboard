import React, { lazy } from 'react';
import { Routes } from 'models/Router.model';
import { OwnerRoute } from '../merchant';

const ForDevsLazy = lazy(async () => {
  const { ForDevs } = await import('./containers/ForDev/ForDevs');
  return { default: ForDevs };
});

export const forDevsRoutes = [
  <OwnerRoute key="dev" path={Routes.dev.root} component={ForDevsLazy} />,
];

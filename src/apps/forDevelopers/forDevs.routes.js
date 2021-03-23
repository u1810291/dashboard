import React, { lazy } from 'react';
import { OwnerRoute } from '../merchant';
import { Routes } from '../../models/Router.model';

const ForDevsLazy = lazy(async () => {
  const { ForDevs } = await import('./containers/ForDev/ForDevs');
  return { default: ForDevs };
});

export const forDevsRoutes = [
  <OwnerRoute key="dev" path={Routes.dev.root} component={ForDevsLazy} />,
];

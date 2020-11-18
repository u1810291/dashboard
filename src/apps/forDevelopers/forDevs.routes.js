import React from 'react';
import { ForDevs } from './containers/ForDev/ForDevs';
import { OwnerRoute } from '../merchant';
import { Routes } from '../../models/Router.model';

export const forDevsRoutes = [
  <OwnerRoute key="dev" path={Routes.dev.root} component={ForDevs} />,
];

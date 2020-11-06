import React from 'react';
import { ForDevs } from './containers/ForDev/ForDevs';
import { OwnerRoute } from '../merchant';

export const forDevsRoutes = [
  <OwnerRoute key="dev" path="/dev" component={ForDevs} />,
];

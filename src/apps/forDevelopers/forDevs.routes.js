import React from 'react';
import { Route } from 'react-router-dom';
import { ForDevs } from './containers/ForDev/ForDevs';

export const forDevsRoutes = [
  <Route key="dev" path="/dev" component={ForDevs} />,
];

/**
 * Array of react-router-config { path: 'string' } configuration objects.
 * Needed by Sentry's tracing instrumentation
 * https://docs.sentry.io/platforms/javascript/guides/react/performance/instrumentation/automatic-instrumentation/
 */

import { Routes } from 'models/Router.model';

 interface RouteConfig {
   [route: string]: string | RouteConfig;
 }

function transformRouteConfigToPathArray(routes: RouteConfig) {
  const pathArr = [];
  Object.keys(routes).forEach((route) => {
    const path = routes[route];
    if (typeof path !== 'string') {
      const subRoutes = transformRouteConfigToPathArray(path);
      pathArr.push(...subRoutes);
    } else {
      pathArr.push({ path });
    }
  });
  return pathArr;
}

const byPathLength = (a, b) => b.path.length - a.path.length;
export const AppPaths = transformRouteConfigToPathArray(Routes).sort(byPathLength);

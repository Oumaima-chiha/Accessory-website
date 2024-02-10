/* eslint-disable @typescript-eslint/no-explicit-any */
import AccessDenied from 'components/AccessDenied';
import NotFound from 'components/NotFound';
import config from 'config/app_config';
import { type IRoute } from 'interfaces/route';
import PrivateLayout from 'layout/PrivateLayout';
import PublicLayout from 'layout/PublicLayout';
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import GLOBAL_ROUTES from './routes';

const renderRoutes = (
  routes: IRoute[],
): Array<Pick<IRoute, 'path' | 'element'>> => {
  const _routes: any[] = [];
  routes.forEach((route: IRoute, index: number) => {
    const renderRoute = route?.private ? (
      <ProtectedRoute key={index} route={route} />
    ) : (
      React.createElement(route.element, { name: route?.name })
    );

    return _routes.push({
      path: route?.path,
      element: renderRoute,
    });
  });
  return _routes;
};

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={config.defaultPath} replace />,
  },
  {
    path: '/private/*',
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={config.defaultPath} replace />,
      },
      ...renderRoutes(GLOBAL_ROUTES.PRIVATE),
    ],
  },
  {
    path: '/public',
    element: <PublicLayout />,
    children: [...renderRoutes(GLOBAL_ROUTES.PUBLIC)],
  },
  { path: '/access-denied', element: <AccessDenied /> },
  { path: '*', element: <NotFound /> },
]);

export default AppRoutes;

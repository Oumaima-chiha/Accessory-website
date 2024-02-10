import Loadable from 'components/Loaders/Loadable';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

const Authentication = Loadable(
  lazy(async () => await import('modules/Authentication')),
);

const AUTH_ROUTES: IRoute[] = [
  {
    path: 'login',
    element: Authentication,
    name: 'Authentication',
    permissions: [],
    private: false,
  },
];

export default AUTH_ROUTES;

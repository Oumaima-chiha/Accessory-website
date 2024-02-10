import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const DashboardContainer = Loadable(
  lazy(async () => await import('modules/Dashboard')),
);

const DASHBOARD_ROUTES: IRoute[] = [
  {
    path: 'dashboard',
    element: DashboardContainer,
    name: 'Dashboard',
    permissions: [PERMISSIONS_CODES.DASHBOARD_VIEW_STATISTICS],
    private: true,
  },
];

export default DASHBOARD_ROUTES;

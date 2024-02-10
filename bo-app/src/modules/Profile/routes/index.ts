import Loadable from 'components/Loaders/Loadable';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const ProfileContainer = Loadable(
  lazy(async () => await import('modules/Profile')),
);

const PROFILE_ROUTES: IRoute[] = [
  {
    path: 'profile',
    element: ProfileContainer,
    name: 'Profile',
    permissions: null,
    private: true,
  },
];

export default PROFILE_ROUTES;

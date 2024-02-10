import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const AboutUsContainer = Loadable(
  lazy(async () => await import('modules/Management/AboutUs')),
);

const AboutUsForm = Loadable(
  lazy(
    async () =>
      await import('modules/Management/AboutUs/components/AboutUsForm'),
  ),
);

const ABOUT_US_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'about-us-management',
    element: AboutUsContainer,
    name: 'AboutUs Management',
    permissions: [PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_VIEW_ABOUT_US],
    private: true,
  },
  {
    path: 'about-us-management/add',
    element: AboutUsForm,
    name: 'AboutUs Management Add',
    permissions: [PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_CREATE_ABOUT_US],
    private: true,
  },
  {
    path: 'about-us-management/edit',
    element: AboutUsForm,
    name: 'AboutUs Management Edit',
    permissions: [PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_UPDATE_ABOUT_US],
    private: true,
  },
  {
    path: 'about-us-management/view',
    element: AboutUsForm,
    name: 'AboutUs Management View',
    permissions: [PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_VIEW_ABOUT_US],
    private: true,
  },
];

export default ABOUT_US_MANAGEMENT_ROUTES;

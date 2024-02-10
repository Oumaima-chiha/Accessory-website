import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const TipsContainer = Loadable(
  lazy(async () => await import('modules/Management/Tips')),
);

const TipsForm = Loadable(
  lazy(async () => await import('modules/Management/Tips/components/TipsForm')),
);

const TIP_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'tip-management',
    element: TipsContainer,
    name: 'Tips Management',
    permissions: [PERMISSIONS_CODES.TIPS_MANAGEMENT_VIEW_TIPS],
    private: true,
  },
  {
    path: 'tip-management/add',
    element: TipsForm,
    name: 'Tips Management Add',
    permissions: [PERMISSIONS_CODES.TIPS_MANAGEMENT_CREATE_TIP],
    private: true,
  },
  {
    path: 'tip-management/edit',
    element: TipsForm,
    name: 'Tips Management Edit',
    permissions: [PERMISSIONS_CODES.TIPS_MANAGEMENT_UPDATE_TIP],
    private: true,
  },
  {
    path: 'tip-management/view',
    element: TipsForm,
    name: 'Tips Management View',
    permissions: [PERMISSIONS_CODES.TIPS_MANAGEMENT_VIEW_TIPS],
    private: true,
  },
];

export default TIP_MANAGEMENT_ROUTES;

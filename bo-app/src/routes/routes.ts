import { type IRoute } from 'interfaces/route';
import AUTH_ROUTES from 'modules/Authentication/routes';
import DASHBOARD_ROUTES from 'modules/Dashboard/routes';
import ABOUT_US_MANAGEMENT_ROUTES from 'modules/Management/AboutUs/routes';
import BO_USER_MANAGEMENT_ROUTES from 'modules/Management/BO Users/routes';
import FAQ_MANAGEMENT_ROUTES from 'modules/Management/Faq/routes';
import FEEDBACK_MANAGEMENT_ROUTES from 'modules/Management/Feedback/routes';
import LEGAL_MANAGEMENT_ROUTES from 'modules/Management/Legal/routes';
import NEWS_MANAGEMENT_ROUTES from 'modules/Management/News/routes';
import NOTIFICATION_MANAGEMENT_ROUTES from 'modules/Management/Notifications/routes';
import ROLE_MANAGEMENT_ROUTES from 'modules/Management/Roles/routes';
import TIP_MANAGEMENT_ROUTES from 'modules/Management/Tips/routes';
import USER_MANAGEMENT_ROUTES from 'modules/Management/Users/routes';
import PROFILE_ROUTES from 'modules/Profile/routes';

const GLOBAL_ROUTES: { PUBLIC: IRoute[]; PRIVATE: IRoute[] } = {
  PUBLIC: [...AUTH_ROUTES],
  PRIVATE: [
    ...DASHBOARD_ROUTES,
    ...NEWS_MANAGEMENT_ROUTES,
    ...FAQ_MANAGEMENT_ROUTES,
    ...USER_MANAGEMENT_ROUTES,
    ...ROLE_MANAGEMENT_ROUTES,
    ...BO_USER_MANAGEMENT_ROUTES,
    ...TIP_MANAGEMENT_ROUTES,
    ...FEEDBACK_MANAGEMENT_ROUTES,
    ...NOTIFICATION_MANAGEMENT_ROUTES,
    ...PROFILE_ROUTES,
    ...LEGAL_MANAGEMENT_ROUTES,
    ...ABOUT_US_MANAGEMENT_ROUTES,
  ],
};

export default GLOBAL_ROUTES;

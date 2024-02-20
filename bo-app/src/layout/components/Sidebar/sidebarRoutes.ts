import store from 'app/store';
import { PERMISSIONS_CODES } from 'interfaces';
import {
  aboutUsManagementRoute,
  boUserManagementRoute,
  dashboardRoute,
  faqManagementRoute,
  feedbackManagementRoute,
  legalManagementRoute,
  newsManagementRoute,
  NotificationsManagementRoute, productsManagementRoute,
  roleManagementRoute,
  tipsManagementRoute,
  userManagementRoute,
} from 'utils/constant';

const routes = [
  {
    icon: 'home-outline',
    label: 'dashboard',
    path: dashboardRoute,
    permissions: [PERMISSIONS_CODES.DASHBOARD_VIEW_STATISTICS],
  },
  {
    icon: 'users',
    label: 'user_management',
    path: userManagementRoute,
    permissions: [PERMISSIONS_CODES.USER_MANAGEMENT_VIEW_END_USERS],
  },
  {
    icon: 'users-2',
    label: 'bo_user_management',
    path: boUserManagementRoute,
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],
  },
  {
    icon: 'feedback',
    label: 'product_management',
    path: productsManagementRoute,
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],
  },
  {
    icon: 'role',
    label: 'role_management',
    path: roleManagementRoute,
    permissions: [PERMISSIONS_CODES.ROLE_MANAGEMENT_VIEW_ROLES],
  },
  // {
  //   icon: 'feedback',
  //   label: 'feedback_management',
  //   path: feedbackManagementRoute,
  //   permissions: [
  //     PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS,
  //     PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES,
  //   ],
  // },
  {
    icon: 'news',
    label: 'news_management',
    path: newsManagementRoute,
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS],
  },

  {
    icon: 'notification',
    label: 'notifications_management',
    path: NotificationsManagementRoute,
    permissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS,
    ],
  },
  {
    icon: 'help',
    label: 'tip_management',
    path: tipsManagementRoute,
    permissions: [PERMISSIONS_CODES.TIPS_MANAGEMENT_VIEW_TIPS],
  },
  // {
  //   icon: 'legal',
  //   label: 'legal.name',
  //   path: legalManagementRoute,
  //   permissions: [
  //     PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY,
  //     PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS,
  //   ],
  // },
  {
    icon: 'legal',
    label: 'legal_management',
    path: legalManagementRoute,
    permissions: [
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS,
    ],
  },
  {
    icon: 'question',
    label: 'faq_management',
    path: faqManagementRoute,
    permissions: [PERMISSIONS_CODES.FAQ_MANAGEMENT_VIEW_FAQS],
  },
  {
    icon: 'about_us',
    label: 'about_us_management',
    path: aboutUsManagementRoute,
    permissions: [PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_VIEW_ABOUT_US],
  },
];

export const useSidebarRoutes = (): {
  icon: string;
  label: string;
  path: string;
  hasPermissions?: boolean;
  isSuperAdmin?: boolean;
}[] => {
  const userRole = store.getState()?.auth?.user?.role;

  const isSuperAdmin =
    userRole?.name?.toLowerCase() ===
    PERMISSIONS_CODES.SUPER_ADMIN?.toLowerCase();

  if (isSuperAdmin) {
    return routes;
  }

  const userPermissions = userRole?.permissions?.map(
    permission => permission?.code,
  );

  const _routes = routes.map(route => {
    const hasPermissions = route?.permissions?.every(
      permission => userPermissions?.includes(permission),
    );
    return {
      ...route,
      hasPermissions,
    };
  });
  return _routes;
};

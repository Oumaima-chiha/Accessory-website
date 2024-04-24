export enum PERMISSIONS_CODES {
  SUPER_ADMIN = 'superAdmin',
  CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT = 'CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT',

  //? *************** DASHBOARD_MANAGEMENT ***************
  DASHBOARD_VIEW_STATISTICS = 'DASHBOARD_VIEW_STATISTICS',

  //? *************** USER_MANAGEMENT_MANAGEMENT ***************
  USER_MANAGEMENT_CREATE_END_USER = 'USER_MANAGEMENT_CREATE_END_USER',
  USER_MANAGEMENT_UPDATE_END_USER = 'USER_MANAGEMENT_UPDATE_END_USER',
  USER_MANAGEMENT_ACTIVATE_DEACTIVATE_END_USER = 'USER_MANAGEMENT_ACTIVATE_DEACTIVATE_END_USER',
  USER_MANAGEMENT_VIEW_END_USERS = 'USER_MANAGEMENT_VIEW_END_USERS',

  //? *************** BO_USER_MANAGEMENT_MANAGEMENT ***************
  BO_USER_MANAGEMENT_CREATE_BO_USER = 'BO_USER_MANAGEMENT_CREATE_BO_USER',
  BO_USER_MANAGEMENT_UPDATE_BO_USER = 'BO_USER_MANAGEMENT_UPDATE_BO_USER',
  BO_USER_MANAGEMENT_DELETE_BO_USER = 'BO_USER_MANAGEMENT_DELETE_BO_USER',
  BO_USER_MANAGEMENT_VIEW_BO_USER = 'BO_USER_MANAGEMENT_VIEW_BO_USER',
  BO_USER_MANAGEMENT_ACTIVATE_DEACTIVATE_BO_USER = 'BO_USER_MANAGEMENT_ACTIVATE_DEACTIVATE_BO_USER',

  //? *************** ROLE_MANAGEMENT_MANAGEMENT ***************
  ROLE_MANAGEMENT_CREATE_ROLE = 'ROLE_MANAGEMENT_CREATE_ROLE',
  ROLE_MANAGEMENT_UPDATE_ROLE = 'ROLE_MANAGEMENT_UPDATE_ROLE',
  ROLE_MANAGEMENT_DELETE_ROLE = 'ROLE_MANAGEMENT_DELETE_ROLE',
  ROLE_MANAGEMENT_VIEW_ROLES = 'ROLE_MANAGEMENT_VIEW_ROLES',

  //? *************** FAQ_MANAGEMENT_MANAGEMENT ***************
  FAQ_MANAGEMENT_CREATE_FAQ = 'FAQ_MANAGEMENT_CREATE_FAQ',
  FAQ_MANAGEMENT_UPDATE_FAQ = 'FAQ_MANAGEMENT_UPDATE_FAQ',
  FAQ_MANAGEMENT_DELETE_FAQ = 'FAQ_MANAGEMENT_DELETE_FAQ',
  FAQ_MANAGEMENT_VIEW_FAQS = 'FAQ_MANAGEMENT_VIEW_FAQS',
  FAQ_MANAGEMENT_ACTIVATE_DEACTIVATE_FAQ = 'FAQ_MANAGEMENT_ACTIVATE_DEACTIVATE_FAQ',

  FAQ_CATEGORY_MANAGEMENT_CREATE_CATEGORY = 'FAQ_CATEGORY_MANAGEMENT_CREATE_CATEGORY',
  FAQ_CATEGORY_MANAGEMENT_UPDATE_CATEGORY = 'FAQ_CATEGORY_MANAGEMENT_UPDATE_CATEGORY',
  FAQ_CATEGORY_MANAGEMENT_DELETE_CATEGORY = 'FAQ_CATEGORY_MANAGEMENT_DELETE_CATEGORY',
  FAQ_CATEGORY_MANAGEMENT_VIEW_CATEGORIES = 'FAQ_CATEGORY_MANAGEMENT_VIEW_CATEGORIES',
  FAQ_CATEGORY_MANAGEMENT_ACTIVATE_DEACTIVATE_CATEGORY = 'FAQ_CATEGORY_MANAGEMENT_ACTIVATE_DEACTIVATE_CATEGORY',

  //? *************** NEWS_MANAGEMENT_MANAGEMENT ***************
  NEWS_MANAGEMENT_CREATE_NEWS = 'NEWS_MANAGEMENT_CREATE_NEWS',
  NEWS_MANAGEMENT_UPDATE_NEWS = 'NEWS_MANAGEMENT_UPDATE_NEWS',
  NEWS_MANAGEMENT_DELETE_NEWS = 'NEWS_MANAGEMENT_DELETE_NEWS',
  NEWS_MANAGEMENT_VIEW_NEWS = 'NEWS_MANAGEMENT_VIEW_NEWS',
  NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_NEWS = 'NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_NEWS',
  NEWS_MANAGEMENT_CREATE_TOPIC = 'NEWS_MANAGEMENT_CREATE_TOPIC',
  NEWS_MANAGEMENT_VIEW_TOPICS = 'NEWS_MANAGEMENT_VIEW_TOPICS',
  NEWS_MANAGEMENT_UPDATE_TOPIC = 'NEWS_MANAGEMENT_UPDATE_TOPIC',
  NEWS_MANAGEMENT_DELETE_TOPIC = 'NEWS_MANAGEMENT_DELETE_TOPIC',
  NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_TOPIC = 'NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_TOPIC',

  //? *************** FEEDBACK_MANAGEMENT ***************
  FEEDBACK_MANAGEMENT_CREATE_FEEDBACK_CATEGORY = 'FEEDBACK_MANAGEMENT_CREATE_FEEDBACK_CATEGORY',
  FEEDBACK_MANAGEMENT_UPDATE_FEEDBACK_CATEGORY = 'FEEDBACK_MANAGEMENT_UPDATE_FEEDBACK_CATEGORY',
  FEEDBACK_MANAGEMENT_DELETE_FEEDBACK_CATEGORY = 'FEEDBACK_MANAGEMENT_DELETE_FEEDBACK_CATEGORY',
  FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES = 'FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES',
  FEEDBACK_MANAGEMENT_ACTIVATE_DEACTIVATE_FEEDBACK_CATEGORY = 'FEEDBACK_MANAGEMENT_ACTIVATE_DEACTIVATE_FEEDBACK_CATEGORY',
  FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK = 'FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK',
  FEEDBACK_MANAGEMENT_DELETE_USER_FEEDBACK = 'FEEDBACK_MANAGEMENT_DELETE_USER_FEEDBACK',
  FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS = 'FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS',

  //? *************** TIPS_MANAGEMENT ***************
  TIPS_MANAGEMENT_CREATE_TIP = 'TIPS_MANAGEMENT_CREATE_TIP',
  TIPS_MANAGEMENT_UPDATE_TIP = 'TIPS_MANAGEMENT_UPDATE_TIP',
  TIPS_MANAGEMENT_DELETE_TIP = 'TIPS_MANAGEMENT_DELETE_TIP',
  TIPS_MANAGEMENT_VIEW_TIPS = 'TIPS_MANAGEMENT_VIEW_TIPS',
  TIPS_MANAGEMENT_ACTIVATE_DEACTIVATE_TIPS = 'TIPS_MANAGEMENT_ACTIVATE_DEACTIVATE_TIPS',

  //? *************** LEGAL_MANAGEMENT ***************
  LEGAL_MANAGEMENT_CREATE_TERMS_CONDITIONS = 'LEGAL_MANAGEMENT_CREATE_TERMS_CONDITIONS',
  LEGAL_MANAGEMENT_UPDATE_TERMS_CONDITIONS = 'LEGAL_MANAGEMENT_UPDATE_TERMS_CONDITIONS',
  LEGAL_MANAGEMENT_DELETE_TERMS_CONDITIONS = 'LEGAL_MANAGEMENT_DELETE_TERMS_CONDITIONS',
  LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS = 'LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS',
  LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_TERMS_CONDITIONS = 'LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_TERMS_CONDITIONS',
  LEGAL_MANAGEMENT_CREATE_PRIVACY_POLICY = 'LEGAL_MANAGEMENT_CREATE_PRIVACY_POLICY',
  LEGAL_MANAGEMENT_UPDATE_PRIVACY_POLICY = 'LEGAL_MANAGEMENT_UPDATE_PRIVACY_POLICY',
  LEGAL_MANAGEMENT_DELETE_PRIVACY_POLICY = 'LEGAL_MANAGEMENT_DELETE_PRIVACY_POLICY',
  LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY = 'LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY',
  LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_PRIVACY_POLICY = 'LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_PRIVACY_POLICY',

  //? *************** ABOUT_US_MANAGEMENT ***************
  ABOUT_US_MANAGEMENT_CREATE_ABOUT_US = 'ABOUT_US_MANAGEMENT_CREATE_ABOUT_US',
  ABOUT_US_MANAGEMENT_UPDATE_ABOUT_US = 'ABOUT_US_MANAGEMENT_UPDATE_ABOUT_US',
  ABOUT_US_MANAGEMENT_DELETE_ABOUT_US = 'ABOUT_US_MANAGEMENT_DELETE_ABOUT_US',
  ABOUT_US_MANAGEMENT_VIEW_ABOUT_US = 'ABOUT_US_MANAGEMENT_VIEW_ABOUT_US',
  ABOUT_US_MANAGEMENT_ACTIVATE_DEACTIVATE_ABOUT_US = 'ABOUT_US_MANAGEMENT_ACTIVATE_DEACTIVATE_ABOUT_US',

  //? *************** NOTIFICATIONS_MANAGEMENT ***************
  NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION = 'NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION',
  NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION = 'NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION',
  NOTIFICATIONS_MANAGEMENT_DELETE_NOTIFICATION = 'NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION',
  NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS = 'NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS',
}
import { getColor } from 'theme/colors';
import { getCookie } from './functions';

export const dashboardRoute = '/private/dashboard';
export const profileRoute = '/private/profile';
export const userManagementRoute = '/private/user-management';
export const boUserManagementRoute = '/private/bo-user-management';
export const roleManagementRoute = '/private/role-management';
export const newsManagementRoute = '/private/news-management';
export const tipsManagementRoute = '/private/tip-management';
export const faqManagementRoute = '/private/faq-management';
export const feedbackManagementRoute = '/private/feedback-management';
export const legalManagementRoute = '/private/legal-management';
export const aboutUsManagementRoute = '/private/about-us-management';
export const NotificationsManagementRoute = '/private/notifications-management';
export const acceptedFileTypes = '.jpg, .gif, .png, .jpeg, .svg, .webp';
export const rtlDirection = getCookie('lang') == 'ar' ? 'rtl' : 'ltr';
export const borderRadius = 8;
export const boxShadow = '0px 6px 20px rgba(0, 55, 135, 0.08)';
export const primaryBgGradient = 'linear(to-r, #C83962, primary.500 100%)';
export const secondaryBgGradient = 'linear(to-r, #42728E, secondary.500 100%)';
export const tertiaryBgGradient =
  'linear(to-b,  #C1B28F 0.01%, #A29475 56.25%, #988968 99.99%)';

export const disabledButtonStyle = {
  opacity: 0.4,
  _hover: {
    bgGradient: secondaryBgGradient,
    cursor: 'not-allowed',
  },
};

export const scrollbarStyle = {
  '::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '::-webkit-scrollbar-thumb': {
    background: getColor('primary'),
    backgroundClip: 'padding-box',
    borderRadius: '9999px',
  },
};

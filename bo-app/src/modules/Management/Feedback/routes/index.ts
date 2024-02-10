import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const FeedbackContainer = Loadable(
  lazy(async () => await import('modules/Management/Feedback')),
);

const UsersFeedbackForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Feedback/components/UsersFeedback/UsersFeedbackForm'
      ),
  ),
);

const CategoriesForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Feedback/components/FeedbackCategories/CategoriesForm'
      ),
  ),
);

const FEEDBACK_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'feedback-management',
    element: FeedbackContainer,
    name: 'Users Management',
    permissions: [PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS],
    private: true,
  },
  {
    path: 'feedback-management/feedback/answer',
    element: UsersFeedbackForm,
    name: 'Users Management Answer',
    permissions: [PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK],
    private: true,
  },
  {
    path: 'feedback-management/feedback/view',
    element: UsersFeedbackForm,
    name: 'Users Management View',
    permissions: [PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS],
    private: true,
  },
  {
    path: 'feedback-management/category/add',
    element: CategoriesForm,
    name: 'Users Management Answer',
    permissions: [
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_CREATE_FEEDBACK_CATEGORY,
    ],
    private: true,
  },
  {
    path: 'feedback-management/category/edit',
    element: CategoriesForm,
    name: 'Users Management Edit Answer',
    permissions: [
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_UPDATE_FEEDBACK_CATEGORY,
    ],
    private: true,
  },
  {
    path: 'feedback-management/category/view',
    element: CategoriesForm,
    name: 'Users Management View',
    permissions: [
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES,
    ],
    private: true,
  },
];

export default FEEDBACK_MANAGEMENT_ROUTES;

import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const FAQContainer = Loadable(
  lazy(async () => await import('modules/Management/Faq')),
);

const FAQForm = Loadable(
  lazy(
    async () => await import('modules/Management/Faq/components/FAQ/FAQForm'),
  ),
);

const FAQCategoryForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Faq/components/Categories/FAQCategoryForm'
      ),
  ),
);

const FAQ_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'faq-management',
    element: FAQContainer,
    name: 'FAQ Management',
    permissions: [
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS,
    ],
    private: true,
  },
  {
    path: 'faq-management/faq/add',
    element: FAQForm,
    name: 'FAQ Add',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_NEWS],
    private: true,
  },
  {
    path: 'faq-management/faq/edit',
    element: FAQForm,
    name: 'FAQ Update',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_NEWS],
    private: true,
  },
  {
    path: 'faq-management/faq/view',
    element: FAQForm,
    name: 'FAQ Delete',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS],
    private: true,
  },
  //* ---------- FAQ Category Routes ------------------
  {
    path: 'faq-management/faq-category/add',
    element: FAQCategoryForm,
    name: 'FAQ Category Add',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_TOPIC],
    private: true,
  },
  {
    path: 'faq-management/faq-category/edit',
    element: FAQCategoryForm,
    name: 'FAQ Category Update',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_TOPIC],
    private: true,
  },
  {
    path: 'faq-management/faq-category/view',
    element: FAQCategoryForm,
    name: 'FAQ Category Delete',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS],
    private: true,
  },
];

export default FAQ_MANAGEMENT_ROUTES;

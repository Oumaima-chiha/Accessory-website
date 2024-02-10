import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';
import TopicsForm from '../components/TopicsManagement/TopicsForm';

// export lazy route
const NewsContainer = Loadable(
  lazy(async () => await import('modules/Management/News')),
);

const NewsForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/News/components/NewsManagement/NewsForm'
      ),
  ),
);

const NEWS_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'news-management',
    element: NewsContainer,
    name: 'News Management',
    permissions: [
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS,
    ],
    private: true,
  },
  {
    path: 'news-management/news/add',
    element: NewsForm,
    name: 'News Add',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_NEWS],
    private: true,
  },
  {
    path: 'news-management/news/edit',
    element: NewsForm,
    name: 'News Update',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_NEWS],
    private: true,
  },
  {
    path: 'news-management/news/view',
    element: NewsForm,
    name: 'News Delete',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS],
    private: true,
  },
  //* ---------- Topic Routes ------------------
  {
    path: 'news-management/topic/add',
    element: TopicsForm,
    name: 'Topic Add',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_TOPIC],
    private: true,
  },
  {
    path: 'news-management/topic/edit',
    element: TopicsForm,
    name: 'Topic Update',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_TOPIC],
    private: true,
  },
  {
    path: 'news-management/topic/view',
    element: TopicsForm,
    name: 'Topic Delete',
    permissions: [PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS],
    private: true,
  },
];

export default NEWS_MANAGEMENT_ROUTES;

import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const ProductsContainer = Loadable(
  lazy(async () => await import('modules/Management/Products')),
);

const ProductForm = Loadable(
  lazy(
    async () =>
      await import('modules/Management/Products/components/ProductForm'),
  ),
);

const PRODUCTS_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'product-management',
    element: ProductsContainer,
    name: 'Product Management',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],
    private: true,
  },
  {
    path: 'product-management/add',
    element: ProductForm,
    name: 'Product Management Add',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER],

    private: true,
  },
  {
    path: 'product-management/edit',
    element: ProductForm,
    name: 'Product Management Edit',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_UPDATE_BO_USER],
    private: true,
  },
  {
    path: 'product-management/view',
    element: ProductForm,
    name: 'Products Management View',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],

    private: true,
  },
];

export default PRODUCTS_MANAGEMENT_ROUTES;

import type { IRoute } from 'interfaces/route';
import React from 'react';
//! Uncomment when Authentication is implemented
import {
  selectIsAuthenticated,
  selectTransformedUserPermissions,
} from 'app/store/selectors';
import AccessDenied from 'components/AccessDenied';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import { Navigate } from 'react-router-dom';

interface Props {
  route: IRoute;
  path?: string;
}

const ProtectedRoute: React.FC<Props> = ({ route }) => {
  //! Uncomment when Authentication is implemented
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userPermissions = useAppSelector(selectTransformedUserPermissions);
  const { isSuperAdmin } = usePermissions({});

  if (isAuthenticated) {
    const routePermission = route?.permissions;
    const hasPermission =
      !routePermission ||
      isSuperAdmin ||
      userPermissions?.some(r => routePermission?.includes(r));

    if (hasPermission) {
      return React.createElement(route.element, { name: route?.name });
    } else {
      return React.createElement(AccessDenied);
    }
  }
  return (
    <Navigate to="/public/login" state={{ name: route?.name?.toLowerCase() }} />
  );
};

export default ProtectedRoute;

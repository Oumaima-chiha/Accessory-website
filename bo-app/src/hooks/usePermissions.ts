/* eslint-disable react-hooks/exhaustive-deps */
import type { PERMISSIONS_CODES } from 'interfaces';
import { useLayoutEffect, useReducer } from 'react';
import { useAppSelector } from './useAppSelector';

interface IPermissionHook {
  requestedPermissions?: PERMISSIONS_CODES[];
}

export type InitialStateType = {
  allPermissionGranted: boolean;
  noPermissionGranted: boolean;
  requestedPermissionStatus: { [key: string]: boolean };
  isSuperAdmin: boolean;
};
const initialState: InitialStateType = {
  allPermissionGranted: false,
  noPermissionGranted: false,
  requestedPermissionStatus: {},
  isSuperAdmin: false,
};

const dispatchTypes = {
  UPDATE_PERMISSION_GRANTED: 'UPDATE_PERMISSION_GRANTED',
  UPDATE_NO_PERMISSION_GRANTED: 'UPDATE_NO_PERMISSION_GRANTED',
  UPDATE_REQUESTED_PERMISSION_GRANTED: 'UPDATE_REQUESTED_PERMISSION_GRANTED',
  UPDATE_SUPER_ADMIN_STATUS: 'UPDATE_SUPER_ADMIN_STATUS',
};
type DispatchAction = {
  type: string;
  allPermissionGranted?: boolean;
  noPermissionGranted?: boolean;
  requestedPermissionStatus?: { [key: string]: boolean };
  isSuperAdmin?: boolean;
};

const permissionReducer = (
  state: InitialStateType,
  {
    type,
    noPermissionGranted = false,
    allPermissionGranted = false,
    isSuperAdmin = false,
    requestedPermissionStatus = {},
  }: DispatchAction,
): InitialStateType => {
  switch (type) {
    case dispatchTypes.UPDATE_SUPER_ADMIN_STATUS:
      return {
        ...state,
        isSuperAdmin: isSuperAdmin,
      };
    case dispatchTypes.UPDATE_NO_PERMISSION_GRANTED:
      return {
        ...state,
        noPermissionGranted,
      };

    case dispatchTypes.UPDATE_PERMISSION_GRANTED:
      return {
        ...state,
        allPermissionGranted,
      };

    case dispatchTypes.UPDATE_REQUESTED_PERMISSION_GRANTED:
      return {
        ...state,
        requestedPermissionStatus,
      };
  }
  return state;
};

const usePermissions = ({
  requestedPermissions,
}: IPermissionHook): InitialStateType => {
  const [currentPermissionState, dispatchCurrentPermissionState] = useReducer(
    permissionReducer,
    initialState,
  );

  const currentUserRole = useAppSelector(state => state.auth.user?.role);

  const permissionGrantHandler = (): void => {
    if (requestedPermissions) {
      const permissionObject: { [key: string]: boolean } = {};
      requestedPermissions?.forEach(permissionRequest => {
        const isPermissionFound = !!currentUserRole?.permissions?.find(
          permission => permission?.code === permissionRequest,
        );
        permissionObject[permissionRequest] = isPermissionFound;
      });
      dispatchCurrentPermissionState({
        type: dispatchTypes.UPDATE_REQUESTED_PERMISSION_GRANTED,
        requestedPermissionStatus: permissionObject,
      });
    }
  };

  useLayoutEffect(() => {
    if (currentUserRole?.name?.toUpperCase() === 'SUPERADMIN') {
      dispatchCurrentPermissionState({
        type: dispatchTypes.UPDATE_SUPER_ADMIN_STATUS,
        isSuperAdmin: true,
      });
    } else if (currentUserRole && currentUserRole?.permissions?.length === 0) {
      dispatchCurrentPermissionState({
        type: dispatchTypes.UPDATE_NO_PERMISSION_GRANTED,
        noPermissionGranted: true,
      });
    } else if (currentUserRole && currentUserRole?.permissions?.length !== 0) {
      permissionGrantHandler();
    }
  }, [currentUserRole]);

  return currentPermissionState;
};

export default usePermissions;

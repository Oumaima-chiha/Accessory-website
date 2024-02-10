import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import CreateOutsideToast from 'components/Toast/Toast';
import { t } from 'i18next';
import { ToastStatus } from 'interfaces/enums/toast';

// export const unauthenticatedMiddleware: Middleware =
//   ({ dispatch }: { dispatch: AppDispatch }) =>
//   next =>
//   async action => {
//     if (isRejectedWithValue(action) && action.payload.status === 401) {
//       const refreshTokenAction = authAPI.endpoints.refreshToken.initiate({});
//       dispatch(refreshTokenAction)
//         .then(() => {
//           return next(action);
//         })
//         .catch(() => {
//           CreateOutsideToast({
//             description: 'unauthorized.description',
//             title: 'unauthorized.title',
//             status: ToastStatus.ERROR,
//           });
//           dispatch(logout());
//         });
//     }

//     return next(action);
//   };

export const errorMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action) && action.payload.status !== 401) {
    CreateOutsideToast({
      description: action?.payload?.data?.message,
      title: action?.payload?.data?.error ?? t('errors:error_occurred'),
      status: ToastStatus.ERROR,
    });
  }

  return next(action);
};

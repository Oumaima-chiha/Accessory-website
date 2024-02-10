import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import type { CustomCriteria } from 'interfaces/criteria';
import type { INotification, NotificationsFiltersPayload } from '../interfaces';

const reducerPath = 'notificationsApi';
export const notificationsAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['Notifications'],
  endpoints: builder => ({
    getNotifications: builder.query<
      IPaginationResponse<INotification>,
      IPaginationPayload & NotificationsFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo/notifications',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'Notifications' }],
    }),
    getCustomCriteria: builder.query<CustomCriteria[], void>({
      query: () => ({
        url: '/bo/notifications/custom-criteria',
        method: 'GET',
      }),
    }),
    addNotification: builder.mutation<INotification, FormData>({
      query: body => ({
        url: '/bo/notifications',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'Notifications' }],
    }),
    updateNotification: builder.mutation<INotification, FormData>({
      query: body => ({
        url: `/bo/notifications/${body.get('id')}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: () => [{ type: 'Notifications' }],
    }),
    deleteNotification: builder.mutation<
      INotification,
      Pick<INotification, 'id'>
    >({
      query: body => ({
        url: `/bo/notifications/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useAddNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useGetCustomCriteriaQuery,
} = notificationsAPI;

export const notificationsQueryReducer = {
  [reducerPath]: notificationsAPI.reducer,
};

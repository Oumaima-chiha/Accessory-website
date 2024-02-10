import { createApi } from '@reduxjs/toolkit/query/react';
import http from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import { ExcelFileNames } from 'interfaces/enums/excelFileNames';
import type { ICategory, IRole } from 'models';
import { downloadFile } from 'utils/functions';
import type { RoleFiltersPayload } from '../interfaces';
import type { IReduxRole } from '../interfaces/role';

const reducerPath = 'rolesApi';
export const rolesAPI = createApi({
  reducerPath,
  baseQuery: http,
  tagTypes: ['Roles'],
  endpoints: builder => ({
    exportData: builder.mutation<Blob, void>({
      query: () => ({
        url: '/bo-role/export-excel',
        method: 'POST',
        responseHandler: async (
          response,
        ): Promise<Response | Record<string, any>> => {
          if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, ExcelFileNames.ROLES);
            return { data: response?.status };
          }
          const result = await response.json();
          return result;
        },
        cache: 'no-cache',
      }),
    }),
    getRoles: builder.query<
      IPaginationResponse<IRole>,
      IPaginationPayload & RoleFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-role',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'Roles' }],
    }),
    getAllRoles: builder.query<IRole[], void>({
      query: () => ({
        url: '/bo-role/unpaged',
        method: 'GET',
      }),
    }),
    getAllCategories: builder.query<ICategory[], {}>({
      query: () => ({
        url: '/bo-category',
        method: 'GET',
      }),
    }),
    addRole: builder.mutation<IRole, IReduxRole.CreateRolePayload>({
      query: body => ({
        url: '/bo-role',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'Roles' }],
    }),
    updateRole: builder.mutation<IRole, IReduxRole.UpdateRolePayload>({
      query: body => ({
        url: `/bo-role/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteRole: builder.mutation<IRole, Pick<IRole, 'id'>>({
      query: body => ({
        url: `/bo-role/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useGetAllRolesQuery,
  useGetAllCategoriesQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useExportDataMutation,
} = rolesAPI;

export const rolesQueryReducer = { [reducerPath]: rolesAPI.reducer };

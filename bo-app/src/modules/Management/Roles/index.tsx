import { selectRoles, selectRolesFilters } from 'app/store/selectors';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { IRole } from 'models/role';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { displayToast } from 'utils/functions';
import { FilterFormSchema } from './extra';
import filterInputs from './extra/filterInputs';
import {
  resetFilters,
  rolesAPI,
  setFilters,
  useDeleteRoleMutation,
  useExportDataMutation,
  useLazyGetRolesQuery,
} from './redux';

const RolesContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation(['role', 'fields', 'shared']);
  const rolesSelector = useAppSelector(selectRoles);
  const rolesFilters = useAppSelector(selectRolesFilters);
  const [deleteRole] = useDeleteRoleMutation();
  const [exportRolesMutation, { isLoading }] = useExportDataMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.ROLE_MANAGEMENT_CREATE_ROLE,
      PERMISSIONS_CODES.ROLE_MANAGEMENT_DELETE_ROLE,
      PERMISSIONS_CODES.ROLE_MANAGEMENT_UPDATE_ROLE,
      PERMISSIONS_CODES.ROLE_MANAGEMENT_VIEW_ROLES,
    ],
  });

  const tableColumns: Columns<IRole>[] = [
    {
      header: t('fields:role_name'),
      accessor: 'name',
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: IRole): void => {
            if (!isSuperAdmin && data?.name?.toUpperCase() === 'SUPER ADMIN') {
              return displayToast(t('errors:unable_to_proceed'), 'warning');
            }
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ROLE_MANAGEMENT_UPDATE_ROLE
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IRole): Promise<void> => {
            if (
              data?.name?.trim()?.toLowerCase() ===
              PERMISSIONS_CODES.SUPER_ADMIN?.toLowerCase()
            ) {
              return displayToast(t('errors:unable_to_proceed'), 'warning');
            }
            try {
              await deleteRole({ id: data?.id }).unwrap();
              displayToast(
                t('role:success_msgs.role_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ROLE_MANAGEMENT_DELETE_ROLE
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IRole): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ROLE_MANAGEMENT_VIEW_ROLES
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IRole): void => {
    navigate(type, {
      state: {
        type,
        ...(data && { form: data }),
      },
    });
    console.info(`Navigate to ${type} Screen`);
  };

  return (
    <DataTable
      title={t('role_management', { ns: 'modules' })}
      columns={tableColumns}
      data={rolesSelector}
      queryTrigger={useLazyGetRolesQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.ROLE_MANAGEMENT_CREATE_ROLE
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('name'),
        },
      })}
      filter={{
        fields: filterInputs,
        actionToDispatch: setFilters,
        validationSchema: FilterFormSchema,
        activeFilters: rolesFilters,
        destroyFilterAction: resetFilters,
        resetApiState: rolesAPI.util.resetApiState,
      }}
      canRefetch
      exportTrigger={{
        isLoading: isLoading,
        trigger: exportRolesMutation,
      }}
    />
  );
};

export default RolesContainer;

import { Badge } from '@chakra-ui/react';
import {
  selectBOUser,
  selectBOUsers,
  selectBOUsersFilters,
} from 'app/store/selectors';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { IBOUser } from 'models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { displayToast } from 'utils/functions';
import { FilterFormSchema } from './extra';
import filterInputs from './extra/filterInputs';
import {
  boUsersApi,
  resetFilters,
  setFilters,
  useDeleteBoUserMutation,
  useExportDataMutation,
  useLazyGetBoUsersQuery,
  useUpdateBoUserMutation,
} from './redux';

const BOUsersContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation(['bo_users', 'fields', 'shared']);
  const usersList = useAppSelector(selectBOUsers);
  const currentUser = useAppSelector(selectBOUser);
  const boUsersFilters = useAppSelector(selectBOUsersFilters);
  const [deleteBoUser] = useDeleteBoUserMutation();
  const [updateBoUser] = useUpdateBoUserMutation();
  const [exportBoUsersMutation, { isLoading }] = useExportDataMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_ACTIVATE_DEACTIVATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_DELETE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_UPDATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER,
    ],
  });

  const tableColumns: Columns<IBOUser>[] = [
    {
      header: t('fields:username'),
      accessor: 'username',
    },
    {
      header: t('fields:firstName'),
      accessor: 'firstname',
    },
    {
      header: t('fields:lastName'),
      accessor: 'lastname',
    },
    {
      header: t('fields:email'),
      accessor: 'email',
    },
    {
      header: t('fields:status'),
      accessor: 'active',
      cell: x => (
        <Badge variant={x ? 'active' : 'inactive'}>
          {x
            ? t('fields:status', { context: 'active' })
            : t('fields:status', { context: 'inactive' })}
        </Badge>
      ),
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: IBOUser): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_UPDATE_BO_USER
            ],
        },
        {
          name: data =>
            data?.active
              ? TABLE_ACTION.DEACTIVATE_USER
              : TABLE_ACTION.ACTIVATE_USER,
          handleClick: async (data: IBOUser): Promise<void> => {
            if (currentUser?.id === data?.id) {
              return displayToast(t('errors:unable_self_action'), 'warning');
            }
            if (data?.username === 'hech.ba') {
              return displayToast(t('errors:unable_to_proceed'), 'warning');
            }

            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
                email: data?.email,
              };

              await updateBoUser(payload).unwrap();
              displayToast(
                t('shared:success_msgs.users_success', {
                  context: data?.active ? 'deactivate' : 'activate',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_ACTIVATE_DEACTIVATE_BO_USER
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IBOUser): Promise<void> => {
            if (currentUser?.id === data?.id) {
              return displayToast(t('errors:unable_self_action'), 'warning');
            }
            if (data?.username === 'hech.ba') {
              return displayToast(t('errors:unable_to_proceed'), 'warning');
            }
            try {
              await deleteBoUser({ id: data?.id }).unwrap();
              displayToast(
                t('shared:success_msgs.users_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_DELETE_BO_USER
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IBOUser): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IBOUser): void => {
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
      title={t('bo_user_management', { ns: 'modules' })}
      columns={tableColumns}
      data={usersList}
      queryTrigger={useLazyGetBoUsersQuery}
      canRefetch
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('bo_user'),
        },
      })}
      filter={{
        fields: filterInputs,
        actionToDispatch: setFilters,
        validationSchema: FilterFormSchema,
        activeFilters: boUsersFilters,
        destroyFilterAction: resetFilters,
        resetApiState: boUsersApi.util.resetApiState,
      }}
      exportTrigger={{
        isLoading: isLoading,
        trigger: exportBoUsersMutation,
      }}
    />
  );
};

export default BOUsersContainer;

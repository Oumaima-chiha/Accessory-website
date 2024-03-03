import { Avatar, Badge } from '@chakra-ui/react';
import { selectEndUsers, selectEndUsersFilters } from 'app/store/selectors';
import DataTable from 'components/Table';
import { useAppDispatch, useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { IUser } from 'models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { displayToast } from 'utils/functions';
import filterInputs from './extra/filterInputs';
import { FilterFormSchema } from './extra/filterValidationSchema';
import {
  resetFilters,
  setFilters,
  updateUser,
  useExportDataMutation,
  useLazyGetUsersQuery,
  usersAPI,
  useBanUserMutation
} from './redux';

const UsersContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['bo_users', 'fields', 'shared']);
  const usersList = useAppSelector(selectEndUsers);
  const endUsersFilters = useAppSelector(selectEndUsersFilters);
  const [triggerBanUser] =  useBanUserMutation();
  const [exportFeedbackMutation, { isLoading }] = useExportDataMutation();
  const { requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.USER_MANAGEMENT_ACTIVATE_DEACTIVATE_END_USER,
      PERMISSIONS_CODES.USER_MANAGEMENT_CREATE_END_USER,
      PERMISSIONS_CODES.USER_MANAGEMENT_VIEW_END_USERS,
    ],
  });

  const tableColumns: Columns<IUser>[] = [
    {
      header: t('fields:name'),
      accessor: 'fullname',
    },
    {
      header: t('fields:email'),
      accessor: 'email',
    },
    {
      header: t('fields:status'),
      accessor: 'isVerified',
      cell: x => (
        <Badge variant={x ? 'active' : 'inactive'}>
          { t('fields:status', { context:x ? 'verified':'pending' })}
        </Badge>
      ),
    },


    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: data =>
            !data?.isBanned
              ? TABLE_ACTION.DEACTIVATE_USER
              : TABLE_ACTION.ACTIVATE_USER,
          handleClick: async (data: IUser): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
               isBanned: data?.isBanned,
              };
              await triggerBanUser(payload).unwrap();
              dispatch(updateUser(payload));
              displayToast(
                t('shared:success_msgs.users_success', {
                  context: !data?.isBanned ? 'deactivate' : 'activate',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          showConfirmationModal: true,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.USER_MANAGEMENT_ACTIVATE_DEACTIVATE_END_USER
            ],
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IUser): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.USER_MANAGEMENT_VIEW_END_USERS
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IUser): void => {
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
      title={t('user_management', { ns: 'modules' })}
      columns={tableColumns}
      data={usersList}
      queryTrigger={useLazyGetUsersQuery}
      filter={{
        fields: filterInputs,
        actionToDispatch: setFilters,
        validationSchema: FilterFormSchema,
        activeFilters: endUsersFilters,
        destroyFilterAction: resetFilters,
        resetApiState: usersAPI.util.resetApiState,
      }}
      canRefetch
      exportTrigger={{
        isLoading: isLoading,
        trigger: exportFeedbackMutation,
      }}
    />
  );
};

export default UsersContainer;

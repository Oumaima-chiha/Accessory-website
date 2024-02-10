import { Badge, Text } from '@chakra-ui/react';
import {
  selectNotifications,
  selectNotificationsFilters,
} from 'app/store/selectors/notificationsSelector';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  capitalizeWords,
  displayToast,
  getTimeElapsed,
  stringToDate,
} from 'utils/functions';
import { notificationsFilterValidationSchema } from './extra';
import filterInputsNotifications from './extra/filterInputs';
import type { INotification } from './interfaces';
import { NotificationStatus } from './interfaces';
import {
  notificationsAPI,
  resetFilters,
  setFilters,
  useDeleteNotificationMutation,
  useLazyGetNotificationsQuery,
} from './redux';

const NotificationsContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const notificationsList = useAppSelector(selectNotifications);
  const notificationsFilters = useAppSelector(selectNotificationsFilters);
  const [deleteNotification] = useDeleteNotificationMutation();
  const { t, i18n } = useTranslation(['notifications', 'fields', 'shared']);
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION,
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION,
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_DELETE_NOTIFICATION,
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS,
    ],
  });

  const getBadgeVariant = {
    [NotificationStatus.PENDING]: {
      variant: 'pending',
      text: t('status', { context: 'pending', ns: 'fields' }),
    },
    [NotificationStatus.PROCESSING]: {
      variant: 'processing',
      text: t('status', { context: 'processing', ns: 'fields' }),
    },
    [NotificationStatus.SENT]: {
      variant: 'active',
      text: t('status', { context: 'sent', ns: 'fields' }),
    },
  };

  const tableColumns: Columns<INotification>[] = [
    {
      header: t('fields:title'),
      accessor: `title${capitalizeWords(i18n.language)}` as keyof INotification,
    },
    {
      header: t('fields:target'),
      accessor: 'targetType',
      capitalizeField: true,
    },
    {
      header: t('fields:status'),
      accessor: 'status',
      cell: (status: NotificationStatus) => (
        <Badge variant={getBadgeVariant[status]?.variant}>
          {getBadgeVariant[status]?.text}
        </Badge>
      ),
    },
    {
      header: t('fields:date', { context: 'send' }),
      accessor: 'sendDate',
      cell: (data: INotification) => (
        <Text color="black">
          {data?.status === NotificationStatus.PROCESSING
            ? t('n/a', { ns: 'common' })
            : data?.status === NotificationStatus.SENT
            ? getTimeElapsed(data?.sendDate)
            : stringToDate(data?.sendDate)}
        </Text>
      ),
      getRowData: true,
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: INotification): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isDisabled: (data: INotification) =>
            data?.status !== NotificationStatus.PENDING,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: INotification): Promise<void> => {
            try {
              await deleteNotification({ id: data?.id }).unwrap();
              displayToast(
                t('success_msgs.notification_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: INotification) =>
            data?.status !== NotificationStatus.PENDING,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_DELETE_NOTIFICATION
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.RESEND,
          handleClick: async (): Promise<void> => {
            try {
              displayToast(t('not_yet_implemented', { ns: 'common' }), 'info');
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: INotification) =>
            data?.status !== NotificationStatus.SENT,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION
            ],
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: INotification): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: INotification): void => {
    navigate(type, {
      state: {
        type,
        ...(data && { form: data }),
      },
    });
    console.info(`Navigate to ${type} Screen`);
  };

  return (
    <>
      <DataTable
        title={t('notifications_management', { ns: 'modules' })}
        columns={tableColumns}
        data={notificationsList}
        queryTrigger={useLazyGetNotificationsQuery}
        {...((isSuperAdmin ||
          !!requestedPermissionStatus[
            PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION
          ]) && {
          addOptions: {
            addFunction: () => ActionBtnHandler(FORM_TYPE.PUSH),
            fullLabel: `${t('push', { ns: 'shared' })} ${t('name')}`,
          },
        })}
        filter={{
          fields: filterInputsNotifications,
          actionToDispatch: setFilters,
          validationSchema: notificationsFilterValidationSchema,
          activeFilters: notificationsFilters,
          destroyFilterAction: resetFilters,
          resetApiState: notificationsAPI.util.resetApiState,
          elementsPerRow: 6,
        }}
        canRefetch
      />
    </>
  );
};

export default NotificationsContainer;

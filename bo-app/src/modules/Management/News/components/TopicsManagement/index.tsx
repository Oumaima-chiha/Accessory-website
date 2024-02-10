import { Badge } from '@chakra-ui/react';
import { selectTopics, selectTopicsFilters } from 'app/store/selectors';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, STATUS, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords, displayToast } from 'utils/functions';
import { filterInputsTopics, topicsFilterValidationSchema } from '../../extra';
import type { ITopic } from '../../interfaces';
import {
  newsAPI,
  resetFilters,
  setTopicsFilters,
  useDeleteTopicMutation,
  useLazyGetTopicsQuery,
  useUpdateTopicMutation,
} from '../../redux';

const TopicsManagementContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['fields', 'shared', 'news']);
  const topicList = useAppSelector(selectTopics);
  const topicsFilters = useAppSelector(selectTopicsFilters);
  const [deleteTopic] = useDeleteTopicMutation();
  const [updateTopicMutation] = useUpdateTopicMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_TOPIC,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_DELETE_TOPIC,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_TOPIC,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_TOPIC,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('fields:title'),
      accessor: `title${capitalizeWords(i18n.language)}`,
    },
    {
      header: t('fields:status'),
      accessor: 'active',
      cell: x => (
        <Badge variant={x ? STATUS.ACTIVE : STATUS.INACTIVE}>
          {x
            ? t('fields:status', { context: STATUS.ACTIVE })
            : t('fields:status', { context: STATUS.INACTIVE })}
        </Badge>
      ),
    },
    {
      header: t('fields:created_at'),
      accessor: 'createdAt',
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: ITopic): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_TOPIC
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: ITopic): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };
              await updateTopicMutation(payload).unwrap();
              displayToast(
                t('news:success_msgs.topic_success', {
                  context: data?.active
                    ? TABLE_ACTION.DEACTIVATE
                    : TABLE_ACTION.ACTIVATE,
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
              PERMISSIONS_CODES.NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_TOPIC
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: ITopic): Promise<void> => {
            try {
              await deleteTopic({ id: data?.id }).unwrap();
              displayToast(
                t('news:success_msgs.topic_success', {
                  context: 'delete',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_DELETE_TOPIC
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: ITopic): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_TOPICS
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: ITopic): void => {
    navigate(`topic/${type}`, {
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
        columns={tableColumns}
        data={topicList}
        queryTrigger={useLazyGetTopicsQuery}
        {...((isSuperAdmin ||
          !!requestedPermissionStatus[
            PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_TOPIC
          ]) && {
          addOptions: {
            addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
            label: t('topic'),
          },
        })}
        filter={{
          fields: filterInputsTopics,
          actionToDispatch: setTopicsFilters,
          validationSchema: topicsFilterValidationSchema,
          activeFilters: topicsFilters,
          destroyFilterAction: resetFilters,
          resetApiState: newsAPI.util.resetApiState,
          elementsPerRow: 3,
        }}
        canRefetch
      />
    </>
  );
};

export default TopicsManagementContainer;

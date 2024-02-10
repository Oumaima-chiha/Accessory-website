import { Badge, Text } from '@chakra-ui/react';
import {
  selectUsersFeedback,
  selectUsersFeedbackFilters,
} from 'app/store/selectors/feedbackSelector';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords, displayToast, getTimeElapsed } from 'utils/functions';
import {
  FeedbackFilterFormSchema,
  filterInputsUsersFeedback,
} from '../../extra';
import type { IFeedback } from '../../interfaces';
import { FeedbackStatus } from '../../interfaces/feedback_status';
import {
  feedbackAPI,
  resetFilters,
  setFeedbackFilters,
  useDeleteUserFeedbackMutation,
  useExportDataMutation,
  useLazyGetUserFeedbacksQuery,
} from '../../redux';

const UsersFeedbackContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['fields', 'shared', 'feedback']);
  const feedbackList = useAppSelector(selectUsersFeedback);
  const usersFeedbackFilters = useAppSelector(selectUsersFeedbackFilters);
  const [deleteFeedback] = useDeleteUserFeedbackMutation();
  const [exportFeedbackMutation, { isLoading }] = useExportDataMutation();
  const { requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_DELETE_USER_FEEDBACK,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('fields:feedback.user_feedback'),
      accessor: 'comment',
    },
    {
      header: t('fields:feedback.feedback_category'),
      accessor: `feedbackCategory.name${capitalizeWords(i18n.language)}`,
    },
    {
      header: t('fields:feedback.patient'),
      accessor: '',
      cell: (data: IFeedback): string => {
        return data?.guestInfo
          ? t('feedback.patient', { context: 'anonymous' })
          : `${data?.user?.firstName} ${data?.user?.lastName}`;
      },
      getRowData: true,
    },
    {
      header: t('fields:status'),
      accessor: 'status',
      cell: (status: FeedbackStatus) => (
        <Badge
          variant={status === FeedbackStatus?.ANSWERED ? 'active' : 'pending'}>
          {status === FeedbackStatus?.ANSWERED
            ? t('fields:status', { context: 'answered' })
            : t('fields:status', { context: 'pending' })}
        </Badge>
      ),
    },
    {
      header: t('fields:created_at'),
      accessor: 'createdAt',
      cell: x => <Text color="black">{getTimeElapsed(x)}</Text>,
    },

    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.ANSWER,
          handleClick: (data: IFeedback): void => {
            ActionBtnHandler(FORM_TYPE.ANSWER, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IFeedback): Promise<void> => {
            try {
              await deleteFeedback({ id: data?.id }).unwrap();
              displayToast(
                t('feedback:success_msgs.feedback_answer_success', {
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
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_DELETE_USER_FEEDBACK
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IFeedback): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_USERS_FEEDBACKS
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = async (
    type: FORM_TYPE,
    data?: IFeedback,
  ): Promise<void> => {
    navigate(`feedback/${type}`, {
      state: {
        type,
        ...(data && { form: data }),
      },
    });

    console.info(`Navigate to ${type} Screen`);
  };

  return (
    <DataTable
      columns={tableColumns}
      data={feedbackList}
      queryTrigger={useLazyGetUserFeedbacksQuery}
      canRefetch
      filter={{
        fields: filterInputsUsersFeedback,
        actionToDispatch: setFeedbackFilters,
        validationSchema: FeedbackFilterFormSchema,
        activeFilters: usersFeedbackFilters,
        destroyFilterAction: resetFilters,
        resetApiState: feedbackAPI.util.resetApiState,
      }}
      exportTrigger={{
        isLoading: isLoading,
        trigger: exportFeedbackMutation,
      }}
    />
  );
};

export default UsersFeedbackContainer;

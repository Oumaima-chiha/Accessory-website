import { Avatar, Badge } from '@chakra-ui/react';
import { selectNews, selectNewsFilters } from 'app/store/selectors';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type {
  ApproveContentPayload,
  Columns,
  DisapproveContentPayload,
} from 'interfaces';
import {
  ContentApprovalTypes,
  ContentReviewStatus,
  PERMISSIONS_CODES,
  TABLE_ACTION,
} from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  capitalizeWords,
  displayToast,
  getBadgeVariant,
} from 'utils/functions';
import { filterInputsNews, newsFilterValidationSchema } from '../../extra';
import type { INews } from '../../interfaces';
import {
  newsAPI,
  resetFilters,
  setNewsFilters,
  useApproveDisapproveNewsMutation,
  useDeleteNewsMutation,
  useLazyGetNewsQuery,
  useUpdateNewsMutation,
} from '../../redux';

const NewsManagementContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const newsList = useAppSelector(selectNews);
  const newsFilters = useAppSelector(selectNewsFilters);
  const { t, i18n } = useTranslation(['news', 'fields', 'shared']);
  const [deleteNews] = useDeleteNewsMutation();
  const [updateNewsMutation] = useUpdateNewsMutation();
  const [approveDisapproveNewsMutation] = useApproveDisapproveNewsMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_DELETE_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS,
      PERMISSIONS_CODES.NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_NEWS,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('fields:title'),
      accessor: `title${capitalizeWords(i18n.language)}`,
    },
    {
      header: t('fields:description'),
      accessor: `description${capitalizeWords(i18n.language)}`,
    },
    {
      header: t('fields:image'),
      accessor: 'image',
      cell: x => <Avatar src={x} />,
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
      header: t('fields:status', { context: 'content' }),
      accessor: 'reviewStatus',
      cell: (reviewStatus: ContentReviewStatus) => (
        <Badge variant={getBadgeVariant[reviewStatus]?.variant}>
          {getBadgeVariant[reviewStatus]?.text}
        </Badge>
      ),
    },
    {
      header: t('fields:created_by'),
      accessor: 'createdByUser.username',
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: INews): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_UPDATE_NEWS
            ],
          isDisabled: (data: INews) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: INews): Promise<void> => {
            try {
              const formData = new FormData();
              formData.append('id', data?.id?.toString());
              formData.append('active', (!data?.active)?.toString());
              await updateNewsMutation(formData).unwrap();
              displayToast(
                t('news:success_msgs.news_success', {
                  context: data?.active ? 'deactivate' : 'activate',
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
              PERMISSIONS_CODES.NEWS_MANAGEMENT_ACTIVATE_DEACTIVATE_NEWS
            ],
          isDisabled: (data: INews) =>
            data?.reviewStatus !== ContentReviewStatus.APPROVED ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: INews): Promise<void> => {
            try {
              await deleteNews({ id: data?.id }).unwrap();
              displayToast(
                t('news:success_msgs.news_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_DELETE_NEWS
            ],
          isDisabled: (data: INews) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: INews): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.NEWS_MANAGEMENT_VIEW_NEWS
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapproveNewsMutation({
                type: ContentApprovalTypes.APPROVE,
                payload: {
                  id: data?.id,
                  publishDate: data?.publishDate,
                },
              }).unwrap();
              displayToast(
                t('success_msgs.content_approval_approved', {
                  ns: 'shared',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isApproval: true,
          isDisabled: (data: INews) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: TABLE_ACTION.DISAPPROVE_CONTENT,
          handleClick: async (
            data: DisapproveContentPayload,
          ): Promise<void> => {
            try {
              await approveDisapproveNewsMutation({
                type: ContentApprovalTypes.DISAPPROVE,
                payload: {
                  id: data?.id,
                  comment: data?.comment,
                },
              }).unwrap();
              displayToast(
                t('success_msgs.content_approval_rejected', {
                  ns: 'shared',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isApproval: true,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          isDisabled: (data: INews) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: INews): void => {
    navigate(`news/${type}`, {
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
        data={newsList}
        queryTrigger={useLazyGetNewsQuery}
        {...((isSuperAdmin ||
          !!requestedPermissionStatus[
            PERMISSIONS_CODES.NEWS_MANAGEMENT_CREATE_NEWS
          ]) && {
          addOptions: {
            addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
            label: t('name'),
          },
        })}
        filter={{
          fields: filterInputsNews,
          actionToDispatch: setNewsFilters,
          validationSchema: newsFilterValidationSchema,
          activeFilters: newsFilters,
          destroyFilterAction: resetFilters,
          resetApiState: newsAPI.util.resetApiState,
          elementsPerRow: 5,
        }}
        canRefetch
      />
    </>
  );
};

export default NewsManagementContainer;

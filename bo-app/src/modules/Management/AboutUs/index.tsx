import { Badge } from '@chakra-ui/react';
import {
  selectAboutUsFilters,
  selectAboutUsList,
} from 'app/store/selectors/aboutUsSelector';
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
import { AboutUsFilterSchema } from './extra';
import aboutUsFilterInputs from './extra/filterInputs';
import type { IAboutUs } from './interfaces';
import {
  aboutUsAPI,
  resetFilters,
  setFilters,
  useApproveDisapproveAboutUsMutation,
  useDeleteAboutUsMutation,
  useLazyGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from './redux';

const AboutUsContainer = (): React.ReactElement => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['about_us', 'fields', 'shared']);
  const [deleteAboutUs] = useDeleteAboutUsMutation();
  const [updateAboutUsMutation] = useUpdateAboutUsMutation();
  const [approveDisapproveAboutUsMutation] =
    useApproveDisapproveAboutUsMutation();
  const aboutUsFilters = useAppSelector(selectAboutUsFilters);
  const aboutUsList = useAppSelector(selectAboutUsList);
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_CREATE_ABOUT_US,
      PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_UPDATE_ABOUT_US,
      PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_DELETE_ABOUT_US,
      PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_VIEW_ABOUT_US,
      PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_ACTIVATE_DEACTIVATE_ABOUT_US,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
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
        <Badge variant={x ? 'active' : 'inactive'}>
          {x
            ? t('fields:status', { context: 'active' })
            : t('fields:status', { context: 'inactive' })}
        </Badge>
      ),
    },
    {
      header: t('fields:created_at'),
      accessor: 'createdAt',
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
          handleClick: (data: IAboutUs): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_UPDATE_ABOUT_US
            ],
          isDisabled: (data: IAboutUs) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: IAboutUs): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };
              await updateAboutUsMutation(payload).unwrap();
              displayToast(
                t('success_msgs.about_us_success', {
                  context: data?.active ? 'deactivate' : 'activate',
                  ns: 'about_us',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: IAboutUs) =>
            data?.reviewStatus !== ContentReviewStatus.APPROVED ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          showConfirmationModal: true,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_ACTIVATE_DEACTIVATE_ABOUT_US
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IAboutUs): Promise<void> => {
            try {
              await deleteAboutUs({ id: data?.id }).unwrap();
              displayToast(
                t('success_msgs.about_us_success', {
                  context: 'delete',
                  ns: 'about_us',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: IAboutUs) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_DELETE_ABOUT_US
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IAboutUs): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_VIEW_ABOUT_US
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapproveAboutUsMutation({
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
          isDisabled: (data: IAboutUs) =>
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
              await approveDisapproveAboutUsMutation({
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
          isDisabled: (data: IAboutUs) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IAboutUs): void => {
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
      title={t('about_us_management', { ns: 'modules' })}
      columns={tableColumns}
      data={aboutUsList}
      queryTrigger={useLazyGetAboutUsQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.ABOUT_US_MANAGEMENT_CREATE_ABOUT_US
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('name'),
        },
      })}
      filter={{
        fields: aboutUsFilterInputs,
        actionToDispatch: setFilters,
        validationSchema: AboutUsFilterSchema,
        activeFilters: aboutUsFilters,
        destroyFilterAction: resetFilters,
        resetApiState: aboutUsAPI.util.resetApiState,
        elementsPerRow: 3,
      }}
      canRefetch
    />
  );
};

export default AboutUsContainer;

import { Avatar, Badge } from '@chakra-ui/react';
import {
  selectTips,
  selectTipsFilters,
} from 'app/store/selectors/tipsSelector';
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
import { tipsFilterValidationSchema } from './extra';
import filterInputsTips from './extra/filterInputs';
import type { ITip } from './interfaces';
import {
  resetFilters,
  setFilters,
  tipsAPI,
  useApproveDisapproveTipMutation,
  useDeleteTipMutation,
  useLazyGetTipsQuery,
  useUpdateTipMutation,
} from './redux';

const TipsContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const tipsList = useAppSelector(selectTips);
  const tipsFilters = useAppSelector(selectTipsFilters);
  const { t, i18n } = useTranslation(['tips', 'fields', 'shared']);
  const [deleteTip] = useDeleteTipMutation();
  const [updateTipMutation] = useUpdateTipMutation();
  const [approveDisapproveTipMutation] = useApproveDisapproveTipMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.TIPS_MANAGEMENT_CREATE_TIP,
      PERMISSIONS_CODES.TIPS_MANAGEMENT_UPDATE_TIP,
      PERMISSIONS_CODES.TIPS_MANAGEMENT_DELETE_TIP,
      PERMISSIONS_CODES.TIPS_MANAGEMENT_VIEW_TIPS,
      PERMISSIONS_CODES.TIPS_MANAGEMENT_ACTIVATE_DEACTIVATE_TIPS,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('fields:tips.tip_name'),
      accessor: `label${capitalizeWords(i18n.language)}`,
    },
    {
      header: t('fields:image'),
      accessor: 'image',
      cell: x => <Avatar src={x} />,
    },
    {
      header: t('fields:status'),
      accessor: 'active',
      cell: isActive => (
        <Badge variant={isActive ? 'active' : 'inactive'}>
          {isActive
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
          handleClick: (data: ITip): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.TIPS_MANAGEMENT_UPDATE_TIP
            ],
          isDisabled: (data: ITip) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: ITip): Promise<void> => {
            try {
              const formData = new FormData();
              formData.append('id', data?.id?.toString());
              formData.append('active', (!data?.active)?.toString());
              await updateTipMutation(formData).unwrap();
              displayToast(
                t('tips:success_msgs.tip_success', {
                  context: data?.active ? 'deactivate' : 'activate',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: ITip) =>
            data?.reviewStatus !== ContentReviewStatus.APPROVED ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          showConfirmationModal: true,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.TIPS_MANAGEMENT_ACTIVATE_DEACTIVATE_TIPS
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: ITip): Promise<void> => {
            try {
              await deleteTip({ id: data?.id }).unwrap();
              displayToast(
                t('tips:success_msgs.tip_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.TIPS_MANAGEMENT_DELETE_TIP
            ],
          isDisabled: (data: ITip) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: ITip): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.TIPS_MANAGEMENT_VIEW_TIPS
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapproveTipMutation({
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
          isDisabled: (data: ITip) =>
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
              await approveDisapproveTipMutation({
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
          isDisabled: (data: ITip) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: ITip): void => {
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
        title={t('tip_management', { ns: 'modules' })}
        columns={tableColumns}
        data={tipsList}
        queryTrigger={useLazyGetTipsQuery}
        {...((isSuperAdmin ||
          !!requestedPermissionStatus[
            PERMISSIONS_CODES.TIPS_MANAGEMENT_CREATE_TIP
          ]) && {
          addOptions: {
            addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
            label: t('name'),
          },
        })}
        filter={{
          fields: filterInputsTips,
          actionToDispatch: setFilters,
          validationSchema: tipsFilterValidationSchema,
          activeFilters: tipsFilters,
          destroyFilterAction: resetFilters,
          resetApiState: tipsAPI.util.resetApiState,
        }}
        canRefetch
      />
    </>
  );
};

export default TipsContainer;

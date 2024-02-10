import { Badge } from '@chakra-ui/react';
import {
  selectPrivacyPolicy,
  selectPrivacyPolicyFilters,
} from 'app/store/selectors/legalSelector';
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
import legalFilterInputs from '../../extra/filterInputs';
import { FilterLegalSchema } from '../../extra/filterValidationSchema';
import type { IPrivacyPolicy } from '../../interfaces';
import {
  legalApi,
  resetFilters,
  setPrivacyPolicyFilters,
  useApproveDisapprovePrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  useLazyGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from '../../redux';

const PrivacyPolicyContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['legal', 'shared', 'fields']);
  const [deletePrivacyPolicy] = useDeletePrivacyPolicyMutation();
  const [updatePrivacyPolicyMutation] = useUpdatePrivacyPolicyMutation();
  const privacyPolicyFilters = useAppSelector(selectPrivacyPolicyFilters);
  const privacyPolicy = useAppSelector(selectPrivacyPolicy);
  const [approveDisapprovePrivacyPolicyMutation] =
    useApproveDisapprovePrivacyPolicyMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_PRIVACY_POLICY,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_PRIVACY_POLICY,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_DELETE_PRIVACY_POLICY,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_PRIVACY_POLICY,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('privacy_policy'),
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
      cell: reviewStatus => (
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
          handleClick: (data: IPrivacyPolicy): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_PRIVACY_POLICY
            ],
          isDisabled: (data: IPrivacyPolicy) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: IPrivacyPolicy): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };
              await updatePrivacyPolicyMutation(payload).unwrap();
              displayToast(
                t('success_msgs.privacy_policy_success', {
                  context: data?.active ? 'deactivate' : 'activate',
                  ns: 'legal',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: IPrivacyPolicy) =>
            data?.active ||
            data?.reviewStatus !== ContentReviewStatus.APPROVED ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          showConfirmationModal: true,
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES
                .LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_PRIVACY_POLICY
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IPrivacyPolicy): Promise<void> => {
            try {
              await deletePrivacyPolicy({ id: data?.id }).unwrap();
              displayToast(
                t('success_msgs.privacy_policy_success', {
                  context: 'delete',
                  ns: 'legal',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: IPrivacyPolicy) =>
            data?.active ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_DELETE_PRIVACY_POLICY
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IPrivacyPolicy): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapprovePrivacyPolicyMutation({
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
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          isDisabled: (data: IPrivacyPolicy) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
          isApproval: true,
        },
        {
          name: TABLE_ACTION.DISAPPROVE_CONTENT,
          handleClick: async (
            data: DisapproveContentPayload,
          ): Promise<void> => {
            try {
              await approveDisapprovePrivacyPolicyMutation({
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
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          isDisabled: (data: IPrivacyPolicy) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
          isApproval: true,
        },
      ],
    },
  ];

  const ActionBtnHandler = async (
    type: FORM_TYPE,
    data?: IPrivacyPolicy,
  ): Promise<void> => {
    navigate(`privacy-policy/${type}`, {
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
      data={privacyPolicy ?? []}
      queryTrigger={useLazyGetPrivacyPolicyQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_PRIVACY_POLICY
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('privacy_policy'),
        },
      })}
      filter={{
        fields: legalFilterInputs,
        actionToDispatch: setPrivacyPolicyFilters,
        validationSchema: FilterLegalSchema,
        activeFilters: privacyPolicyFilters,
        destroyFilterAction: resetFilters,
        resetApiState: legalApi.util.resetApiState,
        elementsPerRow: 3,
      }}
      canRefetch
    />
  );
};

export default PrivacyPolicyContainer;

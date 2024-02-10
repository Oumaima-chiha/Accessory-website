import { Badge } from '@chakra-ui/react';
import {
  selectTermsAndConditions,
  selectTermsAndConditionsFilters,
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
  STATUS,
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

import type { ITermsConditions } from '../../interfaces';
import {
  legalApi,
  resetFilters,
  setTermsConditionsFilters,
  useApproveDisapproveTermsConditionMutation,
  useDeleteTermsConditionMutation,
  useLazyGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from '../../redux';

const TermsConditionsContainer = (): React.ReactElement => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['legal', 'fields', 'shared']);
  const [deleteTermsConditions] = useDeleteTermsConditionMutation();
  const [updateTermsConditionsMutation] = useUpdateTermsConditionsMutation();
  const [approveDisapproveTermsConditionMutation] =
    useApproveDisapproveTermsConditionMutation();
  const termsConditionsFilters = useAppSelector(
    selectTermsAndConditionsFilters,
  );
  const termsConditions = useAppSelector(selectTermsAndConditions);
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_TERMS_CONDITIONS,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_DELETE_TERMS_CONDITIONS,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_TERMS_CONDITIONS,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_TERMS_CONDITIONS,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('terms_conditions'),
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
          handleClick: (data: ITermsConditions): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_TERMS_CONDITIONS
            ],
          isDisabled: (data: ITermsConditions) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: ITermsConditions): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };
              await updateTermsConditionsMutation(payload).unwrap();
              displayToast(
                t('success_msgs.terms_conditions_success', {
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
          isDisabled: (data: ITermsConditions) =>
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
                .LEGAL_MANAGEMENT_ACTIVATE_DEACTIVATE_TERMS_CONDITIONS
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: ITermsConditions): Promise<void> => {
            try {
              await deleteTermsConditions({ id: data?.id }).unwrap();
              displayToast(
                t('success_msgs.terms_conditions_success', {
                  context: 'delete',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: ITermsConditions) =>
            data?.active ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_DELETE_TERMS_CONDITIONS
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: ITermsConditions): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapproveTermsConditionMutation({
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
          isDisabled: (data: ITermsConditions) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
          isApproval: true,
        },
        {
          name: TABLE_ACTION.DISAPPROVE_CONTENT,
          handleClick: async (
            data: DisapproveContentPayload,
          ): Promise<void> => {
            try {
              await approveDisapproveTermsConditionMutation({
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
          isDisabled: (data: ITermsConditions) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
          isApproval: true,
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: ITermsConditions): void => {
    navigate(`terms-conditions/${type}`, {
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
      data={termsConditions}
      queryTrigger={useLazyGetTermsConditionsQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_TERMS_CONDITIONS
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('terms_conditions'),
        },
      })}
      filter={{
        fields: legalFilterInputs,
        actionToDispatch: setTermsConditionsFilters,
        validationSchema: FilterLegalSchema,
        activeFilters: termsConditionsFilters,
        destroyFilterAction: resetFilters,
        resetApiState: legalApi.util.resetApiState,
        elementsPerRow: 3,
      }}
      canRefetch
    />
  );
};

export default TermsConditionsContainer;

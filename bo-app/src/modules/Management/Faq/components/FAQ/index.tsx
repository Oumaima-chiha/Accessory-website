import { Badge } from '@chakra-ui/react';
import { selectFAQs, selectFAQsFilters } from 'app/store/selectors/faqSelector';
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
import { filterInputsFAQ } from '../../extra/filterInputs';
import { faqFilterValidationSchema } from '../../extra/filterValidationSchema';
import type { IFaq } from '../../interfaces';
import {
  faqAPI,
  resetFilters,
  setFAQFilters,
  useApproveDisapproveFAQMutation,
  useDeleteFAQMutation,
  useLazyGetFAQsQuery,
  useUpdateFAQMutation,
} from '../../redux';

const FAQContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['faq', 'fields', 'shared']);
  const faqList = useAppSelector(selectFAQs);
  const faqFilters = useAppSelector(selectFAQsFilters);
  const [deleteFAQ] = useDeleteFAQMutation();
  const [updateFAQMutation] = useUpdateFAQMutation();
  const [approveDisapproveFAQMutation] = useApproveDisapproveFAQMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.FAQ_MANAGEMENT_CREATE_FAQ,
      PERMISSIONS_CODES.FAQ_MANAGEMENT_DELETE_FAQ,
      PERMISSIONS_CODES.FAQ_MANAGEMENT_UPDATE_FAQ,
      PERMISSIONS_CODES.FAQ_MANAGEMENT_VIEW_FAQS,
      PERMISSIONS_CODES.FAQ_MANAGEMENT_ACTIVATE_DEACTIVATE_FAQ,
      PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT,
    ],
  });

  const tableColumns: Columns<IFaq>[] = [
    {
      header: t('fields:title'),
      accessor: `title${capitalizeWords(i18n.language)}` as keyof IFaq,
    },
    {
      header: t('fields:description'),
      accessor: `description${capitalizeWords(i18n.language)}` as keyof IFaq,
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
      header: t('fields:actions', { ns: 'shared' }),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: IFaq): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_MANAGEMENT_UPDATE_FAQ
            ],
          isDisabled: (data: IFaq) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: IFaq): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };

              await updateFAQMutation(payload).unwrap();
              displayToast(
                t('faq:success_msgs.faq_success', {
                  context: data?.active ? 'deactivate' : 'activate',
                }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          showConfirmationModal: true,
          isDisabled: (data: IFaq) =>
            data?.reviewStatus !== ContentReviewStatus.APPROVED ||
            (data?.reviewStatus === ContentReviewStatus.APPROVED &&
              !requestedPermissionStatus[
                PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
              ]),
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_MANAGEMENT_ACTIVATE_DEACTIVATE_FAQ
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IFaq): Promise<void> => {
            try {
              await deleteFAQ({ id: data?.id }).unwrap();
              displayToast(
                t('faq:success_msgs.faq_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isDisabled: (data: IFaq) =>
            data?.reviewStatus === ContentReviewStatus.APPROVED &&
            !requestedPermissionStatus[
              PERMISSIONS_CODES.CONTENT_APPROVAL_APPROVE_DISAPPROVE_CONTENT
            ],
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_MANAGEMENT_DELETE_FAQ
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IFaq): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_MANAGEMENT_VIEW_FAQS
            ],
        },
        {
          name: TABLE_ACTION.APPROVE_CONTENT,
          handleClick: async (data: ApproveContentPayload): Promise<void> => {
            try {
              await approveDisapproveFAQMutation({
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
          isDisabled: (data: IFaq) =>
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
              await approveDisapproveFAQMutation({
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
          isDisabled: (data: IFaq) =>
            data?.reviewStatus !== ContentReviewStatus.PENDING,
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IFaq): void => {
    navigate(`faq/${type}`, {
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
      data={faqList}
      queryTrigger={useLazyGetFAQsQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.FAQ_MANAGEMENT_CREATE_FAQ
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('name'),
        },
      })}
      filter={{
        fields: filterInputsFAQ,
        actionToDispatch: setFAQFilters,
        validationSchema: faqFilterValidationSchema,
        activeFilters: faqFilters,
        destroyFilterAction: resetFilters,
        resetApiState: faqAPI.util.resetApiState,
        elementsPerRow: 5,
      }}
      canRefetch
    />
  );
};

export default FAQContainer;

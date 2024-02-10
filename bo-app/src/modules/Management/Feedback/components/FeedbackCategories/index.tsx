import { Badge } from '@chakra-ui/react';
import {
  selectFeedbackCategories,
  selectFeedbackCategoriesFilters,
} from 'app/store/selectors/feedbackSelector';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, STATUS, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords, displayToast } from 'utils/functions';
import {
  FeedbackCategoryFilterFormSchema,
  filterInputsFeedbackCategories,
} from '../../extra';
import type { IFeedbackCategory } from '../../interfaces';
import {
  feedbackAPI,
  resetFilters,
  setCategoriesFilters,
  useDeleteFeedbackCategoryMutation,
  useLazyGetFeedbackCategoriesQuery,
  useUpdateFeedbackCategoryMutation,
} from '../../redux';

const FeedbackCategoriesContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['fields', 'shared']);
  const categoriesList = useAppSelector(selectFeedbackCategories);
  const feedbackCategoriesFilters = useAppSelector(
    selectFeedbackCategoriesFilters,
  );
  const [deleteFeedbackCategory] = useDeleteFeedbackCategoryMutation();
  const [updateFeedbackCategoryMutation] = useUpdateFeedbackCategoryMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_CREATE_FEEDBACK_CATEGORY,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_DELETE_FEEDBACK_CATEGORY,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_UPDATE_FEEDBACK_CATEGORY,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES,
      PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_ACTIVATE_DEACTIVATE_FEEDBACK_CATEGORY,
    ],
  });

  const tableColumns: Columns[] = [
    {
      header: t('fields:category.category_name'),
      accessor: `name${capitalizeWords(i18n.language)}`,
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
          handleClick: (data: IFeedbackCategory): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_UPDATE_FEEDBACK_CATEGORY
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: IFeedbackCategory): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };
              await updateFeedbackCategoryMutation(payload).unwrap();
              displayToast(
                t('feedback:success_msgs.feedback_category_success', {
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
              PERMISSIONS_CODES
                .FEEDBACK_MANAGEMENT_ACTIVATE_DEACTIVATE_FEEDBACK_CATEGORY
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IFeedbackCategory): Promise<void> => {
            try {
              await deleteFeedbackCategory({ id: data?.id }).unwrap();
              displayToast(
                t('feedback:success_msgs.feedback_category_success', {
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
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_DELETE_FEEDBACK_CATEGORY
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IFeedbackCategory): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_VIEW_FEEDBACK_CATEGORIES
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (
    type: FORM_TYPE,
    data?: IFeedbackCategory,
  ): void => {
    navigate(`category/${type}`, {
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
      data={categoriesList}
      queryTrigger={useLazyGetFeedbackCategoriesQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_CREATE_FEEDBACK_CATEGORY
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('fields:category.category_name'),
        },
      })}
      canRefetch
      filter={{
        fields: filterInputsFeedbackCategories,
        actionToDispatch: setCategoriesFilters,
        validationSchema: FeedbackCategoryFilterFormSchema,
        activeFilters: feedbackCategoriesFilters,
        destroyFilterAction: resetFilters,
        resetApiState: feedbackAPI.util.resetApiState,
      }}
    />
  );
};

export default FeedbackCategoriesContainer;

import { Badge } from '@chakra-ui/react';
import {
  selectFAQCategories,
  selectFAQCategoriesFilters,
} from 'app/store/selectors/faqSelector';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords, displayToast } from 'utils/functions';
import { filterInputsFAQCategories } from '../../extra/filterInputs';
import { faqFilterValidationSchema } from '../../extra/filterValidationSchema';
import type { IFaqCategory } from '../../interfaces';
import {
  faqAPI,
  resetFilters,
  setFaqCategoryFilters,
  useDeleteFAQCategoryMutation,
  useLazyGetFAQCategoriesQuery,
  useUpdateFAQCategoryMutation,
} from '../../redux';

const FAQCategoriesContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['faq', 'fields', 'shared']);
  const faqCategoryList = useAppSelector(selectFAQCategories);
  const faqCategoryFilters = useAppSelector(selectFAQCategoriesFilters);
  const [deleteFAQCategory] = useDeleteFAQCategoryMutation();
  const [updateFAQCategoryMutation] = useUpdateFAQCategoryMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_CREATE_CATEGORY,
      PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_DELETE_CATEGORY,
      PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_UPDATE_CATEGORY,
      PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_VIEW_CATEGORIES,
      PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_ACTIVATE_DEACTIVATE_CATEGORY,
    ],
  });

  const tableColumns: Columns<IFaqCategory>[] = [
    {
      header: t('fields:title'),
      accessor: `title${capitalizeWords(i18n.language)}` as keyof IFaqCategory,
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
      header: t('fields:actions', { ns: 'shared' }),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: IFaqCategory): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_UPDATE_CATEGORY
            ],
        },
        {
          name: data =>
            data?.active ? TABLE_ACTION.DEACTIVATE : TABLE_ACTION.ACTIVATE,
          handleClick: async (data: IFaqCategory): Promise<void> => {
            try {
              const payload = {
                id: data?.id,
                active: !data?.active,
              };

              await updateFAQCategoryMutation(payload).unwrap();
              displayToast(
                t('faq:success_msgs.faq_category_success', {
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
              PERMISSIONS_CODES
                .FAQ_CATEGORY_MANAGEMENT_ACTIVATE_DEACTIVATE_CATEGORY
            ],
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: IFaqCategory): Promise<void> => {
            try {
              await deleteFAQCategory({ id: data?.id }).unwrap();
              displayToast(
                t('faq:success_msgs.faq_category_success', {
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
              PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_DELETE_CATEGORY
            ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: IFaqCategory): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            !!requestedPermissionStatus[
              PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_VIEW_CATEGORIES
            ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: IFaqCategory): void => {
    navigate(`faq-category/${type}`, {
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
      data={faqCategoryList}
      queryTrigger={useLazyGetFAQCategoriesQuery}
      {...((isSuperAdmin ||
        !!requestedPermissionStatus[
          PERMISSIONS_CODES.FAQ_CATEGORY_MANAGEMENT_CREATE_CATEGORY
        ]) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('faq:category', { defaultValue: '' }),
        },
      })}
      filter={{
        fields: filterInputsFAQCategories,
        actionToDispatch: setFaqCategoryFilters,
        validationSchema: faqFilterValidationSchema,
        activeFilters: faqCategoryFilters,
        destroyFilterAction: resetFilters,
        resetApiState: faqAPI.util.resetApiState,
        elementsPerRow: 3,
      }}
      canRefetch
    />
  );
};

export default FAQCategoriesContainer;

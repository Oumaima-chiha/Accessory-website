import React from 'react';

import { Avatar, Badge } from '@chakra-ui/react';
import DataTable from 'components/Table';
import { useAppSelector } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import type { Columns } from 'interfaces';
import { PERMISSIONS_CODES, TABLE_ACTION } from 'interfaces';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { Jewelry } from 'models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { displayToast } from 'utils/functions';
import { useDeleteBoUserMutation, useLazyGetProductsQuery } from './redux';
import { useExportDataMutation } from '../BO Users/redux';
import { selectProductList } from '../../../app/store/selectors/productSelector';


const ProductsContainer = (): React.ReactNode => {
  const navigate = useNavigate();
  const { t } = useTranslation(['jewelry', 'fields', 'shared']);
  const productList = useAppSelector(selectProductList);
  // const currentUser = useAppSelector(selectBOUser);
  const [deleteBoUser] = useDeleteBoUserMutation();
  const [exportBoUsersMutation, { isLoading }] = useExportDataMutation();
  const { isSuperAdmin, requestedPermissionStatus } = usePermissions({
    requestedPermissions: [
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_ACTIVATE_DEACTIVATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_DELETE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_UPDATE_BO_USER,
      PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER,
    ],
  });

  const tableColumns: Columns<Jewelry>[] = [
    {
      header: t('fields:title'),
      accessor: 'name',
    },
    {
      header: t('fields:price'),
      accessor: 'price',
      cell: x => t('shared:priceTND',{price:x?.toFixed(2)}),
    },
    {
      header: t('fields:image'),
      accessor: 'main_image',
      cell: x => <Avatar src={x} />,
    },
    {
      header: t('fields:description'),
      accessor: 'description',
    },
    {
      header: t('fields:status'),
      accessor: 'status',
      cell: x => (
        <Badge variant={x.toLowerCase()==='available' ? 'active' : 'inactive'}>
          { t('fields:status', { context:x.toLowerCase()==='available' ? 'available':'soldout' })}
        </Badge>
      ),
    },
    {
      header: t('fields:actions'),
      accessor: 'action',
      actions: [
        {
          name: TABLE_ACTION.EDIT,
          handleClick: (data: Jewelry): void => {
            ActionBtnHandler(FORM_TYPE.EDIT, data);
          },
          isShown:true,
        },
        {
          name: TABLE_ACTION.DELETE,
          handleClick: async (data: Jewelry): Promise<void> => {
            try {
              await deleteBoUser({ id: data?.id }).unwrap();
              displayToast(
                t('shared:success_msgs.users_success', { context: 'delete' }),
                'success',
              );
            } catch (err) {
              console.error('Error', err);
            }
          },
          isShown:
            requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_DELETE_BO_USER
              ],
          showConfirmationModal: true,
        },
        {
          name: TABLE_ACTION.VIEW,
          handleClick: (data: Jewelry): void => {
            ActionBtnHandler(FORM_TYPE.VIEW, data);
          },
          isShown:
            requestedPermissionStatus[
              PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER
              ],
        },
      ],
    },
  ];

  const ActionBtnHandler = (type: FORM_TYPE, data?: Jewelry): void => {
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
      title={t('product_management', { ns: 'modules' })}
      columns={tableColumns}
      data={productList}
      queryTrigger={useLazyGetProductsQuery}
      canRefetch
      {...((isSuperAdmin ) && {
        addOptions: {
          addFunction: () => ActionBtnHandler(FORM_TYPE.ADD),
          label: t('name'),
        },
      })}
      // filter={{
      //   fields: filterInputs,
      //   actionToDispatch: setFilters,
      //   validationSchema: FilterFormSchema,
      //   activeFilters: boUsersFilters,
      //   destroyFilterAction: resetFilters,
      //   resetApiState: boUsersApi.util.resetApiState,
      // }}
      exportTrigger={{
        isLoading: isLoading,
        trigger: exportBoUsersMutation,
      }}
    />
  );
};

export default ProductsContainer;

import { VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import type { IPermission, IRole } from 'models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { roleManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { RoleFormSchema } from '../extra/RoleFormValidationSchema';
import type { IReduxRole } from '../interfaces/role';
import {
  useAddRoleMutation,
  useGetAllCategoriesQuery,
  useUpdateRoleMutation,
} from '../redux';
import PermissionsContainer from './PermissionsContainer';

const RolesForm = (): JSX.Element => {
  const { t } = useTranslation(['fields', 'common', 'role', 'shared']);
  const [checkedItems, setCheckedItems] = useState<IPermission[]>([]);
  const [errorMessage, showErrorMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<IRole> } = location;
  const [addRoleHandler, { isLoading: isAddRoleLoading }] =
    useAddRoleMutation();
  const [updateRoleHandler, { isLoading: isUpdateRoleLoading }] =
    useUpdateRoleMutation();
  const { isLoading: isCategoriesLoading } = useGetAllCategoriesQuery({});
  const formik = useFormik({
    initialValues: {
      name: state?.form?.name ?? '',
    },
    validationSchema: RoleFormSchema,
    onSubmit: async values => {
      const permissions = checkedItems?.map(permission => permission?.id);

      if (!permissions?.length) {
        showErrorMessage(true);
        return;
      }
      errorMessage && showErrorMessage(false);
      if (state?.type === FORM_TYPE.ADD) {
        await addRoleFn({
          name: values?.name,
          permissions: permissions,
        });
      } else {
        await updateRoleFn({
          id: state?.form?.id,
          name: values?.name,
          permissions: permissions,
        });
      }
    },
  });

  const addRoleFn = async (
    payload: IReduxRole.CreateRolePayload,
  ): Promise<void> => {
    try {
      await addRoleHandler(payload).unwrap();
      displayToast(
        t('role:success_msgs.role_success', { context: 'add' }),
        'success',
      );
      navigate(roleManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRoleFn = async (
    payload: IReduxRole.UpdateRolePayload,
  ): Promise<void> => {
    try {
      await updateRoleHandler(payload).unwrap();
      displayToast(
        t('role:success_msgs.role_success', { context: 'update' }),
        'success',
      );
      navigate(roleManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={(): void => {
        formik.resetForm();
        setCheckedItems([]);
      }}
      title={`${t(`shared:${state?.type}`)} ${t('role:name')}`}
      isLoading={isCategoriesLoading}>
      <VStack gap={5} alignItems="center">
        <FormControlInput
          formik={formik}
          name="name"
          label="role_name"
          readOnly={state?.type === FORM_TYPE.VIEW}
          schema={RoleFormSchema}
        />
        <PermissionsContainer
          checkedItems={checkedItems}
          retrievedRole={state?.form}
          setCheckedItems={setCheckedItems}
          readyOnly={state?.type === FORM_TYPE.VIEW}
          errorMessage={errorMessage}
          showErrorMessage={showErrorMessage}
        />
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddRoleLoading || isUpdateRoleLoading}
          />
        )}
      </VStack>
    </Form>
  );
};

export default RolesForm;

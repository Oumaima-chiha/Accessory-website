import { SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import FormControlSwitch from 'components/Form/components/FormControlSwitch';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import type { IBOUser } from 'models';
import { useGetAllRolesQuery } from 'modules/Management/Roles/redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { boUserManagementRoute } from 'utils/constant';
import { displayToast, getLabelValuePairs } from 'utils/functions';
import * as Yup from 'yup';
import { BOUsersFormSchema } from '../extra/BOUserFormValidationSchema';
import type { IReduxUser } from '../interfaces/user';
import { useAddBoUserMutation, useUpdateBoUserMutation } from '../redux';
import BOUserPwForm from './BOUserPwForm';

const BOUsersForm = (): JSX.Element => {
  const { t } = useTranslation(['bo_users', 'common', 'fields']);
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<IBOUser> } = location;
  const { isLoading } = useGetAllRolesQuery();
  const rolesSelector = useAppSelector(state => state.roles.list);
  const roles = getLabelValuePairs(rolesSelector, 'name', 'id');
  const [addUserHandler, { isLoading: isAddUserLoading }] =
    useAddBoUserMutation();
  const [updateUserHandler, { isLoading: isUpdateUserLoading }] =
    useUpdateBoUserMutation();
  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        ...BOUsersFormSchema,
        password: Yup.string().test(
          'required',
          'field_required',
          function (value) {
            if (state?.type === FORM_TYPE.ADD) {
              return Yup.string().required('field_required').isValidSync(value);
            }
            return true;
          },
        ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'confirm_password')
          .test('required', 'field_required', function (value) {
            if (state?.type === FORM_TYPE.ADD) {
              return Yup.string().required('field_required').isValidSync(value);
            }
            return true;
          }),
      }),
    [state?.type],
  );
  const formik = useFormik({
    initialValues: {
      firstName: state?.form?.firstname ?? '',
      lastName: state?.form?.lastname ?? '',
      email: state?.form?.email ?? '',
      username: state?.form?.username ?? '',
      password: '',
      confirmPassword: '',
      role: state?.form?.roleId ?? '',
      active: state?.form?.active ?? true,
    },
    validationSchema: formSchema,
    onSubmit: async values => {
      const {
        firstName: firstname,
        lastName: lastname,
        email,
        username,
        password,
        active,
      } = values;
      if (state?.type === FORM_TYPE.ADD) {
        await addUserFn({
          firstname,
          lastname,
          email,
          username,
          password,
          roleId: values?.role,
          active,
        });
      } else {
        await updateUserFn({
          id: state?.form?.id,
          firstname,
          lastname,
          email,
          username,
          roleId: values?.role,
          active,
        });
      }
    },
  });

  const addUserFn = async (
    payload: IReduxUser.CreateUserPayload,
  ): Promise<void> => {
    try {
      await addUserHandler(payload).unwrap();
      displayToast(
        t('shared:success_msgs.users_success', { context: 'add' }),
        'success',
      );
      navigate(boUserManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserFn = async (
    payload: IReduxUser.UpdateUserPayload,
  ): Promise<void> => {
    try {
      await updateUserHandler(payload).unwrap();
      displayToast(
        t('shared:success_msgs.users_success', { context: 'update' }),
        'success',
      );
      navigate(boUserManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack gap={10}>
      <Form
        handleSubmit={formik.handleSubmit}
        handleReset={formik.resetForm}
        isLoading={isLoading}
        title={`${t(`shared:${state?.type}`)} ${t('shared:user', {
          context: 'bo',
        })}`}>
        <VStack gap={10} alignItems="start">
          <SimpleGrid columns={2} spacing={2} width="100%">
            <FormControlInput
              formik={formik}
              schema={formSchema}
              name="firstName"
              label="firstName"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              schema={formSchema}
              name="lastName"
              label="lastName"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              schema={formSchema}
              name="email"
              label="email"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlInput
              formik={formik}
              schema={formSchema}
              name="username"
              label="username"
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            {state?.type === FORM_TYPE.ADD && (
              <>
                <FormControlInput
                  formik={formik}
                  schema={formSchema}
                  name="password"
                  type="password"
                  label="password"
                />
                <FormControlInput
                  formik={formik}
                  schema={formSchema}
                  name="confirmPassword"
                  type="password"
                  label="confirm_password"
                />
              </>
            )}
            <FormControlSelect
              name="role"
              label="role"
              formik={formik}
              schema={formSchema}
              defaultValue={state?.form?.roleId}
              options={roles}
              onChange={(role): void => {
                formik.setFieldValue('role', role?.value);
              }}
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
            <FormControlSwitch
              formik={formik}
              name="active"
              leftLabel="status_inactive"
              rightLabel="status_active"
              label="status"
              schema={formSchema}
              readOnly={state?.type === FORM_TYPE.VIEW}
            />
          </SimpleGrid>
          {state?.type !== FORM_TYPE.VIEW && (
            <FormControlButtons
              isLoading={isAddUserLoading || isUpdateUserLoading}
            />
          )}
        </VStack>
      </Form>
      {state?.type === FORM_TYPE.EDIT ? <BOUserPwForm /> : <></>}
    </VStack>
  );
};

export default BOUsersForm;

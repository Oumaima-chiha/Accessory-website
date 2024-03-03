import { SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import { useFormik } from 'formik';
import type { FormProps } from 'interfaces/FormProps';
import type { IBOUser } from 'models';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { boUserManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { BOUserPwFormSchema } from '../extra';
import type { IReduxUser } from '../interfaces/user';
import { useUpdateBoUserPasswordMutation } from '../redux';

const BOUserPwForm = (): JSX.Element => {
  const { t } = useTranslation(['bo_users', 'common', 'fields']);
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<IBOUser> } = location;
  const [updateUserHandler, { isLoading: isUpdateUserLoading }] =
    useUpdateBoUserPasswordMutation();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: BOUserPwFormSchema,
    onSubmit: async values => {
      const { password } = values;
      await updateUserFn({
        id: state?.form?.id,
        password,
      });
    },
  });

  const updateUserFn = async (
    payload: IReduxUser.UpdateUserPayload,
  ): Promise<void> => {
    try {
      await updateUserHandler(payload).unwrap();
      displayToast(
        t('shared:success_msgs.users_success', { context: 'update_password' }),
        'success',
      );
      navigate(boUserManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={t('shared:update_password')}>
      <VStack gap={10} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            schema={BOUserPwFormSchema}
            name="password"
            type="password"
            label="password"
          />
          <FormControlInput
            formik={formik}
            schema={BOUserPwFormSchema}
            name="confirmPassword"
            type="password"
            label="confirm_password"
          />
        </SimpleGrid>
        <FormControlButtons isLoading={isUpdateUserLoading} />
      </VStack>
    </Form>
  );
};

export default BOUserPwForm;

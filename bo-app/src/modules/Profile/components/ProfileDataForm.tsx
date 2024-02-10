import { Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlInput from 'components/Form/components/FormControlInput';
import { Icon } from 'components/Icon';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks';
import { useUpdateBoUserPasswordMutation } from 'modules/Management/BO Users/redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { displayToast } from 'utils/functions';
import { ProfileFormSchema } from '../extra/UserProfileSchemaValidation';
import ProfileAvatarHeader from './ProfileAvatarHeader';

const ProfileDataForm = (): JSX.Element => {
  const { t } = useTranslation(['shared', 'fields']);
  const userSelector = useAppSelector(state => state.auth.user);
  const [isEditMode, setEditMode] = useState(false);
  const [changePasswordTrigger] = useUpdateBoUserPasswordMutation();

  const formik = useFormik({
    initialValues: {
      firstName: userSelector?.firstname ?? '',
      lastName: userSelector?.lastname ?? '',
      email: userSelector?.email ?? '',
      username: userSelector?.username ?? '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: ProfileFormSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        changePasswordTrigger({
          id: userSelector?.id,
          password: values?.password,
        })
          .unwrap()
          .then(() => {
            displayToast(
              t('shared:success_msgs.users_success', {
                context: 'update_password',
              }),
              'success',
            );
            resetForm();
          });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <VStack w="100%">
      <ProfileAvatarHeader />
      <Button
        alignSelf="flex-end"
        w="auto"
        opacity={isEditMode ? 0.8 : 1}
        onClick={(): void => setEditMode(_prev => !_prev)}
        leftIcon={<Icon displayName="edit" w="20px" color="white" />}
        variant="gold">
        <Text color="white" pt={1}>
          {t('update_password')}
        </Text>
      </Button>
      <Form handleSubmit={formik.handleSubmit} removePadding>
        <VStack gap={3}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 2 }}
            spacing={2}
            width="100%">
            <FormControlInput
              formik={formik}
              name="username"
              label="username"
              isDisabled={isEditMode}
            />
            <FormControlInput
              formik={formik}
              name="firstName"
              label="firstName"
              isDisabled={isEditMode}
            />
            <FormControlInput
              formik={formik}
              name="lastName"
              label="lastName"
              isDisabled={isEditMode}
            />
            <FormControlInput
              formik={formik}
              name="email"
              label="email"
              isDisabled={isEditMode}
            />

            {isEditMode && (
              <>
                <FormControlInput
                  formik={formik}
                  name="password"
                  label="password"
                  readOnly={!isEditMode}
                  schema={ProfileFormSchema}
                  type="password"
                />

                <FormControlInput
                  formik={formik}
                  name="confirmPassword"
                  label="confirm_password"
                  schema={ProfileFormSchema}
                  type="password"
                />
              </>
            )}
          </SimpleGrid>
          {isEditMode && <Button type="submit">{t('common:submit')}</Button>}
        </VStack>
      </Form>
    </VStack>
  );
};

export default ProfileDataForm;

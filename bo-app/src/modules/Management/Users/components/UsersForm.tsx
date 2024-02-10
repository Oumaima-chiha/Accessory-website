import { Button, SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import type { IUser } from 'models';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const UsersForm = (): JSX.Element => {
  const { t } = useTranslation(['fields']);
  const location = useLocation();
  const { state }: { state: FormProps<IUser> } = location;

  const formik = useFormik({
    initialValues: {
      firstName: state?.form?.firstName ?? '',
      lastName: state?.form?.lastName ?? '',
      email: state?.form?.email ?? '',
      gender: state?.form?.gender ?? '',
      mobileNumber: state?.form?.mobileNumber ?? '',
      nationality: state?.form?.nationality ?? '',
      country: state?.form?.country ?? '',
      status: state?.form?.active ?? '',
    },
    onSubmit: () => console.info(''),
  });

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      title={`${t(`shared:${state?.type}`)} ${t('shared:user')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="firstName"
            label="firstName"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="lastName"
            label="lastName"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="gender"
            label="gender"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="mobileNumber"
            label="mobile_number"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="email"
            label="email"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="nationality"
            label="nationality"
            readOnly={true}
          />
          <FormControlInput
            formik={formik}
            name="country"
            label="country"
            readOnly={true}
          />
          <FormControlSelect
            name="status"
            label="status"
            formik={formik}
            defaultValue={state?.form?.active ? 'active' : 'inactive'}
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
            onChange={(status): void => {
              formik.setFieldValue('status', status?.value);
            }}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <Button type="submit">{t('common:submit')}</Button>
        )}
      </VStack>
    </Form>
  );
};

export default UsersForm;

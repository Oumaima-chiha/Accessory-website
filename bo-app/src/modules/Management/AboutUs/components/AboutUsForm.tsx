import { SimpleGrid, VStack } from '@chakra-ui/react';
import ApprovalDetails from 'components/ContentApproval/ApprovalDetails';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlEditor from 'components/Form/components/FormControlEditor';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSwitch from 'components/Form/components/FormControlSwitch';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces';
import type { FormProps } from 'interfaces/FormProps';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { aboutUsManagementRoute } from 'utils/constant';
import { displayToast, isEditorFieldEmpty } from 'utils/functions';
import { AboutUsFormSchema } from '../extra';
import type { IAboutUs, IReduxAboutUs } from '../interfaces';
import { useAddAboutUsMutation, useUpdateAboutUsMutation } from '../redux';

const AboutUsForm = (): React.ReactElement => {
  const { t } = useTranslation(['about_us', 'common', 'fields']);
  const [addAboutUsHandler, { isLoading: isAddAboutUsLoading }] =
    useAddAboutUsMutation();
  const [updateAboutUsHandler, { isLoading: isUpdateAboutUsLoading }] =
    useUpdateAboutUsMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<IAboutUs> } = location;
  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      contentAr: state?.form?.contentAr ?? '',
      contentEn: state?.form?.contentEn ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: AboutUsFormSchema,
    onSubmit: async values => {
      const { contentAr, contentEn } = values;
      if (isEditorFieldEmpty(contentEn) || isEditorFieldEmpty(contentAr))
        return;

      if (state?.type === FORM_TYPE.ADD) {
        await addAboutUsFn(values);
      } else {
        await updateAboutUsFn({
          id: state?.form?.id,
          ...values,
        });
      }
    },
  });

  const addAboutUsFn = async (
    payload: IReduxAboutUs.CreateAboutUsPayload,
  ): Promise<void> => {
    try {
      await addAboutUsHandler(payload).unwrap();
      displayToast(
        t('success_msgs.about_us_success', { context: 'add' }),
        'success',
      );
      navigate(aboutUsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateAboutUsFn = async (
    payload: IReduxAboutUs.UpdateAboutUsPayload,
  ): Promise<void> => {
    try {
      await updateAboutUsHandler(payload).unwrap();
      displayToast(
        t('success_msgs.about_us_success', { context: 'update' }),
        'success',
      );
      navigate(aboutUsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t('name')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={AboutUsFormSchema}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={AboutUsFormSchema}
          />
          <FormControlEditor
            name="contentAr"
            label="content_ar"
            dir="rtl"
            value={formik?.values['contentAr']}
            handleChange={formik.handleChange('contentAr')}
            formik={formik}
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={AboutUsFormSchema}
          />
          <FormControlEditor
            name="contentEn"
            label="content_en"
            value={formik?.values['contentEn']}
            handleChange={formik.handleChange('contentEn')}
            formik={formik}
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={AboutUsFormSchema}
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            readOnly={state?.type === FORM_TYPE.VIEW}
            isDisabled={state?.type === FORM_TYPE.ADD}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddAboutUsLoading || isUpdateAboutUsLoading}
          />
        )}
        {state?.type === FORM_TYPE.VIEW && (
          <ApprovalDetails
            reviewStatus={state?.form?.reviewStatus}
            createdBy={state?.form?.createdByUser?.username}
            reviewer={state?.form?.reviewedByUser?.username}
            createdAt={state?.form?.createdAt}
            updatedAt={state?.form?.updatedAt}
            comment={state?.form?.comment}
            publishDate={state?.form?.publishDate}
          />
        )}
      </VStack>
    </Form>
  );
};

export default AboutUsForm;

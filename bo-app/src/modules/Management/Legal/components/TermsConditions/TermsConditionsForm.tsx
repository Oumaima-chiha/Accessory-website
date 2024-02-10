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
import { legalManagementRoute } from 'utils/constant';
import { displayToast, isEditorFieldEmpty } from 'utils/functions';
import { LegalFormSchema } from '../../extra/validationSchema';
import type { IReduxLegal, ITermsConditions } from '../../interfaces';
import {
  useAddTermsConditionMutation,
  useUpdateTermsConditionsMutation,
} from '../../redux';

const TermsConditionsForm = (): React.ReactElement => {
  const { t } = useTranslation(['legal', 'common', 'fields']);
  const [addTermsConditionsHandler, { isLoading: isAddTermsConditionLoading }] =
    useAddTermsConditionMutation();
  const [
    updateTermsConditionsHandler,
    { isLoading: isUpdateTermsConditionLoading },
  ] = useUpdateTermsConditionsMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { state }: { state: FormProps<ITermsConditions> } = location;
  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      contentAr: state?.form?.contentAr ?? '',
      contentEn: state?.form?.contentEn ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: LegalFormSchema,
    onSubmit: async values => {
      const { contentAr, contentEn } = values;
      if (isEditorFieldEmpty(contentEn) || isEditorFieldEmpty(contentAr))
        return;

      if (state?.type === FORM_TYPE.ADD) {
        await addTermsConditionsFn(values);
      } else {
        await updateTermsConditionsFn({
          id: state?.form?.id,
          ...values,
        });
      }
    },
  });

  const addTermsConditionsFn = async (
    payload: IReduxLegal.CreateTermsConditionPayload,
  ): Promise<void> => {
    try {
      await addTermsConditionsHandler(payload).unwrap();
      displayToast(
        t('success_msgs.terms_conditions_success', { context: 'add' }),
        'success',
      );
      navigate(legalManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTermsConditionsFn = async (
    payload: IReduxLegal.UpdateTermsConditionPayload,
  ): Promise<void> => {
    try {
      await updateTermsConditionsHandler(payload).unwrap();
      displayToast(
        t('success_msgs.terms_conditions_success', { context: 'update' }),
        'success',
      );
      navigate(legalManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t('legal:terms_conditions')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={LegalFormSchema}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={LegalFormSchema}
          />
          <FormControlEditor
            name="contentAr"
            label="content_ar"
            dir="rtl"
            value={formik?.values['contentAr']}
            handleChange={formik.handleChange('contentAr')}
            formik={formik}
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={LegalFormSchema}
          />
          <FormControlEditor
            name="contentEn"
            label="content_en"
            value={formik?.values['contentEn']}
            handleChange={formik.handleChange('contentEn')}
            formik={formik}
            readOnly={state?.type === FORM_TYPE.VIEW}
            schema={LegalFormSchema}
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
            isLoading={
              isAddTermsConditionLoading || isUpdateTermsConditionLoading
            }
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

export default TermsConditionsForm;

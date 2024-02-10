import { SimpleGrid, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSwitch from 'components/Form/components/FormControlSwitch';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { faqManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { FAQCategoryFormSchema } from '../../extra/FAQFormValidationSchema';
import type { IFaqCategory } from '../../interfaces';
import type { IReduxFAQ } from '../../interfaces/redux_faq';
import {
  useAddFAQCategoryMutation,
  useUpdateFAQCategoryMutation,
} from '../../redux';

const FAQForm = (): JSX.Element => {
  const { t } = useTranslation(['faq', 'shared']);
  const location = useLocation();
  const navigate = useNavigate();
  const [addFAQCategoryHandler, { isLoading: isAddFAQCategoryLoading }] =
    useAddFAQCategoryMutation();
  const [updateFAQCategoryHandler, { isLoading: isUpdateFAQCategoryLoading }] =
    useUpdateFAQCategoryMutation();
  const { state }: { state: FormProps<IFaqCategory> } = location;

  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      active: state?.form?.active ?? true,
    },
    validationSchema: FAQCategoryFormSchema,
    onSubmit: values => {
      if (state?.type === FORM_TYPE.ADD) {
        addFAQFn(values);
      } else {
        updateFAQFn({
          ...values,
          id: state?.form?.id,
        });
      }
    },
  });

  const addFAQFn = async (
    payload: IReduxFAQ.CreateFAQCategoryPayload,
  ): Promise<void> => {
    try {
      await addFAQCategoryHandler(payload).unwrap();
      displayToast(
        t('faq:success_msgs.faq_category_success', { context: 'add' }),
        'success',
      );
      navigate(faqManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFAQFn = async (
    payload: IReduxFAQ.UpdateFAQCategoryPayload,
  ): Promise<void> => {
    try {
      await updateFAQCategoryHandler(payload).unwrap();
      displayToast(
        t('faq:success_msgs.faq_category_success', { context: 'update' }),
        'success',
      );
      navigate(faqManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t('category')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            schema={FAQCategoryFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            schema={FAQCategoryFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={FAQCategoryFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddFAQCategoryLoading || isUpdateFAQCategoryLoading}
          />
        )}
      </VStack>
    </Form>
  );
};

export default FAQForm;

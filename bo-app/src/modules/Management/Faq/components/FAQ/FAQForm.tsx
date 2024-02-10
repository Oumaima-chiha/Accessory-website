import { SimpleGrid, VStack } from '@chakra-ui/react';
import { allFaqCategories } from 'app/store/selectors/faqSelector';
import ApprovalDetails from 'components/ContentApproval/ApprovalDetails';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSelect from 'components/Form/components/FormControlSelect';
import FormControlSwitch from 'components/Form/components/FormControlSwitch';
import FormControlTextArea from 'components/Form/components/FormControlTextArea';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { faqManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { FAQFormSchema } from '../../extra/FAQFormValidationSchema';
import type { IFaq } from '../../interfaces';
import type { IReduxFAQ } from '../../interfaces/redux_faq';
import {
  useAddFAQMutation,
  useGetAllFAQCategoriesQuery,
  useUpdateFAQMutation,
} from '../../redux';

const FAQForm = (): JSX.Element => {
  const { t } = useTranslation(['faq', 'shared']);
  const location = useLocation();
  const navigate = useNavigate();
  const [addFAQHandler, { isLoading: isAddFAQLoading }] = useAddFAQMutation();
  const [updateFAQHandler, { isLoading: isUpdateFAQLoading }] =
    useUpdateFAQMutation();
  const { state }: { state: FormProps<IFaq> } = location;
  const { isLoading: isGetFAQCategoriesLoading } =
    useGetAllFAQCategoriesQuery();
  const faqCategoriesList = useAppSelector(allFaqCategories);

  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      descriptionAr: state?.form?.descriptionAr ?? '',
      descriptionEn: state?.form?.descriptionEn ?? '',
      categoryId: state?.form?.faqCategory?.id ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: FAQFormSchema,
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
    payload: IReduxFAQ.CreateFAQPayload,
  ): Promise<void> => {
    try {
      await addFAQHandler(payload).unwrap();
      displayToast(
        t('faq:success_msgs.faq_success', { context: 'add' }),
        'success',
      );
      navigate(faqManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFAQFn = async (
    payload: IReduxFAQ.UpdateFAQPayload,
  ): Promise<void> => {
    try {
      await updateFAQHandler(payload).unwrap();
      displayToast(
        t('faq:success_msgs.faq_success', { context: 'update' }),
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
      title={`${t(`shared:${state?.type}`)} ${t('name')}`}
      isLoading={isGetFAQCategoriesLoading}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            schema={FAQFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            schema={FAQFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionAr"
            label="description_ar"
            dir="rtl"
            schema={FAQFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionEn"
            label="description_en"
            schema={FAQFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlSelect
            name="categoryId"
            label="category.category_name"
            formik={formik}
            schema={FAQFormSchema}
            defaultValue={state?.form?.faqCategory?.id}
            options={faqCategoriesList}
            onChange={(category): void => {
              formik.setFieldValue('categoryId', category?.value);
            }}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={FAQFormSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
            isDisabled={state?.type === FORM_TYPE.ADD}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddFAQLoading || isUpdateFAQLoading}
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

export default FAQForm;

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
import { feedbackManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { FeedbackCategorySchema } from '../../extra/validation-schema/FeedbackCategorySchema';
import type { IFeedbackCategory, IReduxFeedback } from '../../interfaces';
import {
  useAddFeedbackCategoryMutation,
  useUpdateFeedbackCategoryMutation,
} from '../../redux';

const CategoriesForm = (): JSX.Element => {
  const { t } = useTranslation(['fields', 'common']);
  const location = useLocation();
  const navigate = useNavigate();
  const [
    addFeedbackCategoryHandler,
    { isLoading: isAddFeedbackCategoryLoading },
  ] = useAddFeedbackCategoryMutation();
  const [
    updateFeedbackCategoryHandler,
    { isLoading: isUpdateFeedbackCategoryLoading },
  ] = useUpdateFeedbackCategoryMutation();
  const { state }: { state: FormProps<IFeedbackCategory> } = location;

  const formik = useFormik({
    initialValues: {
      nameAr: state?.form?.nameAr ?? '',
      nameEn: state?.form?.nameEn ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: FeedbackCategorySchema,
    onSubmit: async values => {
      // const { nameAr, nameEn } = values;
      if (state?.type === FORM_TYPE.ADD) {
        await addFeedbackCategoryFn(values);
      } else {
        await updateFeedbackCategoryFn({
          id: state?.form?.id,
          ...values,
        });
      }
    },
  });

  const addFeedbackCategoryFn = async (
    payload: IReduxFeedback.CreateFeedbackCategoryPayload,
  ): Promise<void> => {
    try {
      await addFeedbackCategoryHandler(payload).unwrap();
      displayToast(
        t('feedback:success_msgs.feedback_category_success', {
          context: 'add',
        }),
        'success',
      );
      navigate(feedbackManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFeedbackCategoryFn = async (
    payload: IReduxFeedback.UpdateFeedbackCategoryPayload,
  ): Promise<void> => {
    try {
      await updateFeedbackCategoryHandler(payload).unwrap();
      displayToast(
        t('feedback:success_msgs.feedback_category_success', {
          context: 'update',
        }),
        'success',
      );
      navigate(feedbackManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t(
        'fields:category.category_name',
      )}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            schema={FeedbackCategorySchema}
            name="nameAr"
            label="category.category_name_ar"
            dir="rtl"
          />
          <FormControlInput
            formik={formik}
            schema={FeedbackCategorySchema}
            name="nameEn"
            label="category.category_name_en"
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={FeedbackCategorySchema}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={
              isAddFeedbackCategoryLoading || isUpdateFeedbackCategoryLoading
            }
          />
        )}
      </VStack>
    </Form>
  );
};

export default CategoriesForm;

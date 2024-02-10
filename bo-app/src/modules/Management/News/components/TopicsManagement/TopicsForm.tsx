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
import { newsManagementRoute } from 'utils/constant';
import { displayToast } from 'utils/functions';
import { TopicsFormSchema } from '../../extra/NewsFormValidationSchema';
import type { IReduxNews, ITopic } from '../../interfaces';
import { useCreateTopicMutation, useUpdateTopicMutation } from '../../redux';

const TopicsForm = (): JSX.Element => {
  const { t } = useTranslation(['fields', 'common']);
  const location = useLocation();
  const navigate = useNavigate();
  const [addTopicHandler, { isLoading: isAddTopicLoading }] =
    useCreateTopicMutation();
  const [updateTopicHandler, { isLoading: isUpdateTopicLoading }] =
    useUpdateTopicMutation();
  const { state }: { state: FormProps<ITopic> } = location;

  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      active: state?.form?.active ?? true,
    },
    validationSchema: TopicsFormSchema,
    onSubmit: async values => {
      // const { nameAr, nameEn } = values;
      if (state?.type === FORM_TYPE.ADD) {
        await addTopicFn(values);
      } else {
        await updateTopicFn({
          id: state?.form?.id,
          ...values,
        });
      }
    },
  });

  const addTopicFn = async (
    payload: IReduxNews.CreateTopicPayload,
  ): Promise<void> => {
    try {
      await addTopicHandler(payload).unwrap();
      displayToast(
        t('news:success_msgs.topic_success', {
          context: 'add',
        }),
        'success',
      );
      navigate(newsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTopicFn = async (
    payload: IReduxNews.UpdateTopicPayload,
  ): Promise<void> => {
    try {
      await updateTopicHandler(payload).unwrap();
      displayToast(
        t('news:success_msgs.topic_success', {
          context: 'update',
        }),
        'success',
      );
      navigate(newsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik?.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t('news:topic')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            schema={TopicsFormSchema}
            name="titleAr"
            label="title_ar"
            dir="rtl"
          />
          <FormControlInput
            formik={formik}
            schema={TopicsFormSchema}
            name="titleEn"
            label="title_en"
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={TopicsFormSchema}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddTopicLoading || isUpdateTopicLoading}
          />
        )}
      </VStack>
    </Form>
  );
};

export default TopicsForm;

import { SimpleGrid, VStack } from '@chakra-ui/react';
import { allTopics } from 'app/store/selectors';
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
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { newsManagementRoute } from 'utils/constant';
import { displayToast, isValidFileType } from 'utils/functions';
import * as Yup from 'yup';
import {
  MAX_FILE_SIZE,
  NewsFormSchema,
} from '../../extra/NewsFormValidationSchema';
import type { INews } from '../../interfaces';
import {
  useCreateNewsMutation,
  useGetAllTopicsQuery,
  useUpdateNewsMutation,
} from '../../redux';

const NewsForm = (): JSX.Element => {
  const { t } = useTranslation(['news', 'common', 'fields']);
  const location = useLocation();
  const { state }: { state: FormProps<INews> } = location;
  const [addNewsHandler, { isLoading: isAddNewsLoading }] =
    useCreateNewsMutation();
  const [updateNewsHandler, { isLoading: isUpdateNewsLoading }] =
    useUpdateNewsMutation();
  const { isLoading } = useGetAllTopicsQuery();

  const allTopicsList = useAppSelector(allTopics);
  const navigate = useNavigate();

  const NewsFormYupSchema = useMemo(() => {
    return Yup.object().shape({
      ...NewsFormSchema,
      image: Yup.mixed().test('required', 'field_required', function (value) {
        if (state?.type === FORM_TYPE.ADD) {
          const image = value as File;
          if (!image) {
            return this.createError({
              path: 'image',
              message: 'field_required',
            });
          }

          if (!isValidFileType(image?.name?.toLowerCase(), 'image')) {
            return this.createError({
              path: 'image',
              message: 'invalid_image',
            });
          }

          if (image?.size > MAX_FILE_SIZE) {
            return this.createError({
              path: 'image',
              message: 'max_size_limit',
            });
          }
        }

        return true;
      }),
    });
  }, [state?.type]);

  const formik = useFormik({
    initialValues: {
      titleAr: state?.form?.titleAr ?? '',
      titleEn: state?.form?.titleEn ?? '',
      descriptionAr: state?.form?.descriptionAr ?? '',
      descriptionEn: state?.form?.descriptionEn ?? '',
      topicId: state?.form?.topic?.id ?? '',
      image: state?.form?.image ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: NewsFormYupSchema,
    onSubmit: async values => {
      const {
        image,
        descriptionAr,
        descriptionEn,
        titleAr,
        titleEn,
        topicId,
        active,
      } = values;
      const formData = new FormData();
      if (typeof image !== 'string') {
        formData.append('image', image);
      }
      formData.append('titleAr', titleAr);
      formData.append('titleEn', titleEn);
      formData.append('descriptionAr', descriptionAr);
      formData.append('descriptionEn', descriptionEn);
      formData.append('topicId', topicId?.toString());
      formData.append('active', active?.toString());
      if (state?.type === FORM_TYPE.ADD) {
        await addNewsFn(formData);
      } else {
        formData.append('id', state?.form?.id?.toString());
        await updateNewsFn(formData);
      }
    },
  });

  const addNewsFn = async (payload: FormData): Promise<void> => {
    try {
      await addNewsHandler(payload).unwrap();
      displayToast(
        t('news:success_msgs.news_success', { context: 'add' }),
        'success',
      );
      navigate(newsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateNewsFn = async (payload: FormData): Promise<void> => {
    try {
      await updateNewsHandler(payload).unwrap();
      displayToast(
        t('news:success_msgs.news_success', { context: 'update' }),
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
      title={`${t(`shared:${state?.type}`)} ${t('news:name')}`}
      isLoading={isLoading}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionAr"
            label="description_ar"
            dir="rtl"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionEn"
            label="description_en"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlSelect
            name="topicId"
            label="topic"
            formik={formik}
            schema={NewsFormYupSchema}
            defaultValue={state?.form?.topic?.id}
            options={allTopicsList}
            onChange={(topic): void => {
              formik.setFieldValue('topicId', topic?.value);
            }}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="image"
            label="image"
            type="file"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />

          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={NewsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
            isDisabled={state?.type === FORM_TYPE.ADD}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddNewsLoading || isUpdateNewsLoading}
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

export default NewsForm;

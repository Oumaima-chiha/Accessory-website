import { SimpleGrid, VStack } from '@chakra-ui/react';
import ApprovalDetails from 'components/ContentApproval/ApprovalDetails';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlSwitch from 'components/Form/components/FormControlSwitch';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { tipsManagementRoute } from 'utils/constant';
import { displayToast, isValidFileType } from 'utils/functions';
import * as Yup from 'yup';
import {
  MAX_FILE_SIZE,
  TipsFormSchema,
} from '../extra/TipsFormValidationSchema';
import type { ITip } from '../interfaces';
import { useAddTipMutation, useUpdateTipMutation } from '../redux';

const TipsForm = (): JSX.Element => {
  const { t } = useTranslation(['tips', 'common', 'fields']);
  const location = useLocation();
  const { state }: { state: FormProps<ITip> } = location;
  const [addTipHandler, { isLoading: isAddTipLoading }] = useAddTipMutation();
  const [updateTipHandler, { isLoading: isUpdateTipLoading }] =
    useUpdateTipMutation();
  const navigate = useNavigate();

  const TipsFormYupSchema = useMemo(() => {
    return Yup.object().shape({
      ...TipsFormSchema,
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
      labelAr: state?.form?.labelAr ?? '',
      labelEn: state?.form?.labelEn ?? '',
      image: state?.form?.image ?? '',
      active: state?.form?.active ?? false,
    },
    validationSchema: TipsFormYupSchema,
    onSubmit: async values => {
      const { image, labelAr, labelEn, active } = values;
      const formData = new FormData();
      if (typeof image !== 'string') {
        formData.append('image', image);
      }
      formData.append('labelAr', labelAr);
      formData.append('labelEn', labelEn);
      formData.append('active', active?.toString());
      if (state?.type === FORM_TYPE.ADD) {
        await addTipFn(formData);
      } else {
        formData.append('id', state?.form?.id?.toString());
        await updateTipFn(formData);
      }
    },
  });

  const addTipFn = async (payload: FormData): Promise<void> => {
    try {
      await addTipHandler(payload).unwrap();
      displayToast(
        t('tips:success_msgs.tip_success', { context: 'add' }),
        'success',
      );
      navigate(tipsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTipFn = async (payload: FormData): Promise<void> => {
    try {
      await updateTipHandler(payload).unwrap();
      displayToast(
        t('tips:success_msgs.tip_success', { context: 'update' }),
        'success',
      );
      navigate(tipsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      title={`${t(`shared:${state?.type}`)} ${t('tips:name')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="labelAr"
            label="tips.tip_name_ar"
            dir="rtl"
            schema={TipsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="labelEn"
            label="tips.tip_name_en"
            schema={TipsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="image"
            label="image"
            type="file"
            schema={TipsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlSwitch
            formik={formik}
            name="active"
            leftLabel="status_inactive"
            rightLabel="status_active"
            label="status"
            schema={TipsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
            isDisabled={state?.type === FORM_TYPE.ADD}
          />
        </SimpleGrid>
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isAddTipLoading || isUpdateTipLoading}
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

export default TipsForm;

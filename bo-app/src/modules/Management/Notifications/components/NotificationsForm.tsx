import { SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react';
import Form from 'components/Form';
import FormControlButtons from 'components/Form/components/FormControlButtons';
import FormControlInput from 'components/Form/components/FormControlInput';
import FormControlRadioGroup from 'components/Form/components/FormControlRadioGroup';
import FormControlTextArea from 'components/Form/components/FormControlTextArea';
import { useFormik } from 'formik';
import { FORM_TYPE } from 'interfaces/enums/formType';
import type { FormProps } from 'interfaces/FormProps';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationsManagementRoute } from 'utils/constant';
import { displayToast, isValidFileType } from 'utils/functions';
import * as Yup from 'yup';
import {
  MAX_FILE_SIZE,
  NotificationsFormSchema,
} from '../extra/NotificationsFormValidationSchema';
import type { INotification } from '../interfaces';
import { TargetType } from '../interfaces';
import {
  useAddNotificationMutation,
  useGetCustomCriteriaQuery,
  useUpdateNotificationMutation,
} from '../redux';
import NotificationCriteria from './NotificationCriteria';

const NotificationsForm = (): JSX.Element => {
  const { t } = useTranslation(['notifications', 'common', 'fields']);
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();
  const { state }: { state: FormProps<INotification> } = location;
  const [sendNotificationHandler, { isLoading: isSendNotifLoading }] =
    useAddNotificationMutation();
  const [updateNotificationHandler, { isLoading: isUpdateNotifLoading }] =
    useUpdateNotificationMutation();
  const { data, isLoading } = useGetCustomCriteriaQuery();
  const navigate = useNavigate();

  const NotificationsFormYupSchema = useMemo(() => {
    return Yup.object().shape({
      ...NotificationsFormSchema,
      image: Yup.mixed().test('required', 'field_required', function (value) {
        if (state?.type === FORM_TYPE.PUSH) {
          const image = value as File;
          if (!image) return true;

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
      sendDate:
        moment
          .utc(state?.form?.sendDate)
          .local()
          .subtract(1, 'hour')
          .format('YYYY-MM-DDTHH:mm') ?? '',
      targetType: state?.form?.targetType ?? TargetType.ALL_USERS,
      criteria: [],
      image: state?.form?.image ?? '',
    },
    validationSchema: NotificationsFormYupSchema,
    onSubmit: async values => {
      const {
        image,
        titleEn,
        titleAr,
        descriptionEn,
        descriptionAr,
        sendDate,
        targetType,
        criteria,
      } = values;
      const formData = new FormData();
      if (typeof image !== 'string') {
        formData.append('image', image);
      }
      formData.append('titleAr', titleAr);
      formData.append('titleEn', titleEn);
      formData.append('descriptionEn', descriptionEn);
      formData.append('descriptionAr', descriptionAr);
      formData.append('sendDate', sendDate);
      formData.append('targetType', targetType);
      if (targetType === TargetType.CUSTOM_CRITERIA) {
        formData.append('criteria', JSON.stringify(criteria));
      }
      if (state?.type === FORM_TYPE.PUSH) {
        await sendNotificationFn(formData);
      } else {
        formData.append('id', state?.form?.id?.toString());
        await updateNotificationFn(formData);
      }
    },
  });

  const sendNotificationFn = async (payload: FormData): Promise<void> => {
    try {
      await sendNotificationHandler(payload).unwrap();
      displayToast(
        t('notifications:success_msgs.notification_success', {
          context: 'send',
        }),
        'success',
      );
      navigate(NotificationsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  const updateNotificationFn = async (payload: FormData): Promise<void> => {
    try {
      await updateNotificationHandler(payload).unwrap();
      displayToast(
        t('notifications:success_msgs.notification_success', {
          context: 'update',
        }),
        'success',
      );
      navigate(NotificationsManagementRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      handleReset={formik.resetForm}
      showConfirmPopup
      title={`${t(`shared:${state?.type}`)} ${t('notifications:name')}`}>
      <VStack gap={3} alignItems="start">
        <SimpleGrid columns={2} spacing={2} width="100%">
          <FormControlInput
            formik={formik}
            name="titleAr"
            label="title_ar"
            dir="rtl"
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="titleEn"
            label="title_en"
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="sendDate"
            label="date"
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlInput
            formik={formik}
            name="image"
            label="image"
            type="file"
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionAr"
            label="description_ar"
            dir="rtl"
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlTextArea
            formik={formik}
            name="descriptionEn"
            label="description_en"
            schema={NotificationsFormYupSchema}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
          <FormControlRadioGroup
            formik={formik}
            name="targetType"
            label="target"
            handleChange={(value): void => {
              if (value === TargetType.CUSTOM_CRITERIA && !isLoading) {
                onToggle();
              } else {
                isOpen && onToggle();
              }
            }}
            schema={NotificationsFormYupSchema}
            options={[
              {
                label: 'notifications:users_all',
                value: TargetType.ALL_USERS,
              },
              {
                label: 'notifications:users_guest',
                value: TargetType.GUEST_USERS,
              },
              {
                label: 'notifications:users_registered',
                value: TargetType.REGISTERED_USERS,
              },
              ...(!data?.length
                ? []
                : [
                    {
                      label: 'fields:criteria.custom',
                      value: TargetType.CUSTOM_CRITERIA,
                    },
                  ]),
            ]}
            readOnly={state?.type === FORM_TYPE.VIEW}
          />
        </SimpleGrid>
        <NotificationCriteria
          isOpen={isOpen}
          formik={formik}
          formType={state?.type}
          NotificationsFormYupSchema={NotificationsFormYupSchema}
          customFields={data ?? []}
        />
        {state?.type !== FORM_TYPE.VIEW && (
          <FormControlButtons
            isLoading={isSendNotifLoading || isUpdateNotifLoading}
          />
        )}
      </VStack>
    </Form>
  );
};

export default NotificationsForm;

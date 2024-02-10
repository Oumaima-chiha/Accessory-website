import * as Yup from 'yup';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const TipsFormSchema = {
  labelAr: Yup.string().required('field_required'),
  labelEn: Yup.string().required('field_required'),
};

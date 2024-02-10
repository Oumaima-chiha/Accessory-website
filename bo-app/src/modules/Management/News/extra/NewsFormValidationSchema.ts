import * as Yup from 'yup';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const NewsFormSchema = {
  titleAr: Yup.string().required('field_required'),
  titleEn: Yup.string().required('field_required'),
  descriptionAr: Yup.string().required('field_required'),
  descriptionEn: Yup.string().required('field_required'),
  topicId: Yup.string().trim().required('field_required'),
};

export const TopicsFormSchema = Yup.object().shape({
  titleAr: Yup.string().required('field_required'),
  titleEn: Yup.string().required('field_required'),
});

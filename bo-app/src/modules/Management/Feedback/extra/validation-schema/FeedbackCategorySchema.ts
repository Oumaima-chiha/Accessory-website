import * as Yup from 'yup';

export const FeedbackCategorySchema = Yup.object().shape({
  nameAr: Yup.string().required('field_required'),
  nameEn: Yup.string().required('field_required'),
});

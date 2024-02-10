import * as Yup from 'yup';

export const FAQFormSchema = Yup.object().shape({
  titleAr: Yup.string()
    .trim()
    .min(2, 'too_short')
    .max(100, 'too_long')
    .required('field_required'),
  titleEn: Yup.string()
    .trim()
    .min(2, 'too_short')
    .max(100, 'too_long')
    .required('field_required'),
  descriptionAr: Yup.string().trim().required('field_required'),
  descriptionEn: Yup.string().trim().required('field_required'),
  categoryId: Yup.string().trim().required('field_required'),
  status: Yup.string().trim().optional(),
});

export const FAQCategoryFormSchema = Yup.object().shape({
  titleAr: Yup.string()
    .trim()
    .min(2, 'too_short')
    .max(100, 'too_long')
    .required('field_required'),
  titleEn: Yup.string()
    .trim()
    .min(2, 'too_short')
    .max(100, 'too_long')
    .required('field_required'),
  status: Yup.string().trim().optional(),
});

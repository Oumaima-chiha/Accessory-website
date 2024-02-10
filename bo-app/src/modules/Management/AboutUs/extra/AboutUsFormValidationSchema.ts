import * as Yup from 'yup';

export const AboutUsFormSchema = Yup.object().shape({
  titleAr: Yup.string()
    .trim()
    .strict(true)
    .min(2, 'too_short')
    .max(50, 'too_long')
    .required('field_required'),
  titleEn: Yup.string()
    .trim()
    .strict(true)
    .min(2, 'too_short')
    .max(50, 'too_long')
    .required('field_required'),
  contentAr: Yup.string().required('field_required'),
  contentEn: Yup.string().required('field_required'),
});

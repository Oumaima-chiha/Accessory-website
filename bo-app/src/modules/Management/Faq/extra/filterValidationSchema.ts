import * as Yup from 'yup';

export const faqFilterValidationSchema = Yup.object().shape({
  titleEn: Yup.string().trim().optional(),
  titleAr: Yup.string().trim().optional(),
  descriptionEn: Yup.string().trim().optional(),
  descriptionAr: Yup.string().trim().optional(),
  status: Yup.string().trim().optional(),
});

import * as Yup from 'yup';

export const tipsFilterValidationSchema = Yup.object().shape({
  labelEn: Yup.string().trim().optional(),
  labelAr: Yup.string().trim().optional(),
  status: Yup.string().trim().optional(),
});

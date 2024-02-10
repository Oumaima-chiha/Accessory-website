import * as Yup from 'yup';

export const FilterLegalSchema = Yup.object().shape({
  titleAr: Yup.string().trim().optional(),
  titleEn: Yup.string().trim().optional(),
  contentAr: Yup.string().trim().optional(),
  contentEn: Yup.string().trim().optional(),
  status: Yup.string().trim().optional(),
});

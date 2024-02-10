import * as Yup from 'yup';

export const RoleFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .strict(true)
    .min(2, 'too_short')
    .max(50, 'too_long')
    .required('field_required'),
});

import * as Yup from 'yup';

export const FilterFormSchema = Yup.object().shape({
  firstName: Yup.string().strict(true).trim(),
  lastName: Yup.string().strict(true),
  email: Yup.string().email('invalid_email').strict(true).trim(),
  status: Yup.string().trim().optional(),
});

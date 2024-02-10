import * as Yup from 'yup';

export const FilterFormSchema = Yup.object().shape({
  name: Yup.string().strict(true).trim(),
});

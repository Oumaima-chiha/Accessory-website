import * as Yup from 'yup';

export const SignInFormValidation = Yup.object().shape({
  username: Yup.string().required('field_required'),
  password: Yup.string().required('field_required'),
});

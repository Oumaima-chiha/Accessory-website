import * as Yup from 'yup';

export const BOUserPwFormSchema = Yup.object().shape({
  password: Yup.string().required('field_required').label('Password'),
  confirmPassword: Yup.string()
    .required('field_required')
    .oneOf([Yup.ref('password')], 'confirm_password'),
});

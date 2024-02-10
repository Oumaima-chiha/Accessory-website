import * as Yup from 'yup';

export const ProfileFormSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string(),
  username: Yup.string(),
  password: Yup.string().required('field_required').label('Password'),
  confirmPassword: Yup.string()
    .required('field_required')
    .oneOf([Yup.ref('password')], 'confirm_password'),
});

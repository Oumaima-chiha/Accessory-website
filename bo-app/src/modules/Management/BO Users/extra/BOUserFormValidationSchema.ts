import * as Yup from 'yup';

export const BOUsersFormSchema = {
  firstName: Yup.string()
    .strict(true)
    .trim()
    .required('field_required')
    .label('First Name'),
  lastName: Yup.string()
    .strict(true)
    .trim()
    .required('field_required')
    .label('Last Name'),
  email: Yup.string()
    .strict(true)
    .trim()
    .email('invalid_email')
    .required('field_required')
    .label('Email'),
  username: Yup.string()
    .strict(true)
    .trim()
    .required('field_required')
    .label('Username'),
  role: Yup.string().trim().required('field_required').label('Role'),
};

import * as Yup from 'yup';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const NotificationsFormSchema = {
  titleEn: Yup.string().required('field_required'),
  titleAr: Yup.string().required('field_required'),
  descriptionEn: Yup.string().required('field_required'),
  descriptionAr: Yup.string().required('field_required'),
  sendDate: Yup.string().required('field_required'),
  targetType: Yup.string().required('field_required'),
  // criteria: Yup.object().shape(
  //   {
  //     all_users: Yup.string(),
  //     age: Yup.string().when(
  //       ['all_users', 'region', 'country'],
  //       ([all_users, region, country], schema) => {
  //         if (region || country) return schema.optional();
  //         if (all_users == 'false' || !all_users)
  //           return schema.required('field_required');
  //         return schema.optional();
  //       },
  //     ),
  //     region: Yup.string().when(
  //       ['all_users', 'age', 'country'],
  //       ([all_users, age, country], schema) => {
  //         if (age || country) return schema;
  //         if (all_users == 'false' || !all_users)
  //           return schema.required('field_required');
  //         return schema;
  //       },
  //     ),
  //     country: Yup.string().when(
  //       ['all_users', 'region', 'age'],
  //       ([all_users, region, age], schema) => {
  //         if (region || age) return schema;
  //         if (all_users == 'false' || !all_users)
  //           return schema.required('field_required');
  //         return schema;
  //       },
  //     ),
  //   },
  //   [
  //     ['all_users', 'country'],
  //     ['all_users', 'age'],
  //     ['all_users', 'region'],
  //     ['age', 'country'],
  //     ['region', 'country'],
  //     ['region', 'age'],
  //   ],
  // ),
};

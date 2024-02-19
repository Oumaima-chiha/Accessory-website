import * as Yup from 'yup';

const jewelrySchema = {
  name: Yup.string().required(),
  description: Yup.string(),
  category: Yup.array().of(Yup.string()),
  main_image: Yup.string().required(),
  extra_images: Yup.array().of(Yup.string()).default([]),
  price: Yup.number().required(),
  quantity: Yup.number().integer().min(0).required(),
};

export default jewelrySchema;

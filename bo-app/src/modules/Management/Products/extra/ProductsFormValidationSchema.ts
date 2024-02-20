import * as Yup from 'yup';
import Category from '../../../../common/enums/ProductCategory';

const jewelrySchema = {
  name: Yup.string().required(),
  description: Yup.string(),
  category: Yup.array().of(Yup.mixed<Category>().oneOf(Object.values(Category))).required(),
  main_image: Yup.string().required(),
  extra_images: Yup.array().of(Yup.string()).default([]),
  price: Yup.number().min(1).required(),
  quantity: Yup.number().integer().min(1).required(),
};

export default jewelrySchema;

import type Category from '../common/enums/ProductCategory';

export declare type Jewelry = {
  id: number;
  name: string;
  description?: string;
  category: Category[];
  main_image: string;
  extra_images?: string[];
  status: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

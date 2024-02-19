export declare type Jewelry = {
  id: number;
  name: string;
  description?: string;
  category: string[];
  main_image: string;
  extra_images?: string[];
  status: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

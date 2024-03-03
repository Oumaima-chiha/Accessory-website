export declare type IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  fullname: string;
  email: string;
  password: string;
  profilePic?: string | null;
  isVerified: boolean;
  shippingAddress?: IShippingAddress | null;
  isBanned: boolean;

}
interface IShippingAddress {
  id: number;
  createdAt: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;

}


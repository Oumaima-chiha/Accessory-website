import type { Jewelry } from 'models'; // Assuming Jewelry is the interface for the jewelry model

declare namespace IReduxJewelry {
  export interface InitialState {
    list: Jewelry[];
    // You can add more properties here if needed, such as filters
  }

  export interface CreateJewelryPayload {
    name: string;
    description?: string;
    category: string[];
    main_image: string;
    extra_images?: string[];
    status: string;
    price: number;
    quantity: number;
  }

  export interface UpdateJewelryPayload extends Partial<CreateJewelryPayload> {
    id: number;
  }
}

export { IReduxJewelry };

import type { IRootState } from '../index';
import type { Jewelry } from '../../../models';


export const selectProductList= (state: IRootState): Jewelry[] =>
  state.product.list;

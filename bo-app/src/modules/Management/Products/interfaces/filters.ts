import type { STATUS } from 'interfaces';

export interface ProductsFiltersPayload {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

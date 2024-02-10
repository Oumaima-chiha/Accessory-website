import type { STATUS } from 'interfaces';

export interface EndUserFiltersPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

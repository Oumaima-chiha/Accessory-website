import type { STATUS } from 'interfaces';

export interface TipsFiltersPayload {
  labelEn?: string;
  labelAr?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

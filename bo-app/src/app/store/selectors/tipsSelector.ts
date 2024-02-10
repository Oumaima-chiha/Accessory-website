import type {
  ITip,
  TipsFiltersPayload,
} from 'modules/Management/Tips/interfaces';
import type { IRootState } from '..';

export const selectTips = (state: IRootState): ITip[] => state.tips.list;
export const selectTipsFilters = (state: IRootState): TipsFiltersPayload =>
  state.tips.filters;

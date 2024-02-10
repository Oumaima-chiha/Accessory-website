import type {
  AboutUsFiltersPayload,
  IAboutUs,
} from 'modules/Management/AboutUs/interfaces';

import type { IRootState } from '..';

export const selectAboutUsList = (state: IRootState): IAboutUs[] =>
  state.aboutUs.list;

export const selectAboutUsFilters = (
  state: IRootState,
): AboutUsFiltersPayload => state.aboutUs.filters;

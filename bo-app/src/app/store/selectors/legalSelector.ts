import type {
  IPrivacyPolicy,
  ITermsConditions,
  LegalFiltersPayload,
} from 'modules/Management/Legal/interfaces';

import type { IRootState } from '..';

export const selectPrivacyPolicy = (state: IRootState): IPrivacyPolicy[] =>
  state.legal.privacyPolicy;
export const selectTermsAndConditions = (
  state: IRootState,
): ITermsConditions[] => state.legal.termsConditions;

export const selectActiveLegalTab = (state: IRootState): number =>
  state.legal.activeTab;

export const selectPrivacyPolicyFilters = (
  state: IRootState,
): LegalFiltersPayload => state.legal.privacyPolicyFilters;
export const selectTermsAndConditionsFilters = (
  state: IRootState,
): LegalFiltersPayload => state.legal.termsConditionsFilters;

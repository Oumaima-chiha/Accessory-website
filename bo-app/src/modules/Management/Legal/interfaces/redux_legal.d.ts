import type { LegalFiltersPayload } from './filters';
import type { IPrivacyPolicy, ITermsConditions } from './legal';

declare namespace IReduxLegal {
  export interface InitialState {
    activeTab: number;
    termsConditions: ITermsConditions[];
    privacyPolicy: IPrivacyPolicy[];
    termsConditionsFilters: LegalFiltersPayload;
    privacyPolicyFilters: LegalFiltersPayload;
  }

  export interface CreatePrivacyPolicyPayload {
    active: boolean;
  }

  export interface UpdatePrivacyPolicyPayload
    extends Partial<CreatePrivacyPolicyPayload> {
    id: number;
  }
  export interface CreateTermsConditionPayload {
    active: boolean;
  }

  export interface UpdateTermsConditionPayload
    extends Partial<CreateTermsConditionPayload> {
    id: number;
  }
}

export { IReduxLegal };

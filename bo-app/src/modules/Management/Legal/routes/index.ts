import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const LegalContainer = Loadable(
  lazy(async () => await import('modules/Management/Legal')),
);

const TermsConditionsForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Legal/components/TermsConditions/TermsConditionsForm'
      ),
  ),
);

const PrivacyPolicyForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Legal/components/PrivacyPolicy/PrivacyPolicyForm'
      ),
  ),
);

const LEGAL_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'legal-management',
    element: LegalContainer,
    name: 'Legal Management',
    permissions: [
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS,
      PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY,
    ],
    private: true,
  },
  {
    path: 'legal-management/terms-conditions/add',
    element: TermsConditionsForm,
    name: 'Terms & Conditions Management Answer',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_TERMS_CONDITIONS],
    private: true,
  },
  {
    path: 'legal-management/terms-conditions/edit',
    element: TermsConditionsForm,
    name: 'Legal Management Edit Answer',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_TERMS_CONDITIONS],
    private: true,
  },
  {
    path: 'legal-management/terms-conditions/view',
    element: TermsConditionsForm,
    name: 'Terms & Conditions Management View',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_TERMS_CONDITIONS],
    private: true,
  },
  {
    path: 'legal-management/privacy-policy/add',
    element: PrivacyPolicyForm,
    name: 'Terms & Conditions Management Answer',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_CREATE_PRIVACY_POLICY],
    private: true,
  },
  {
    path: 'legal-management/privacy-policy/edit',
    element: PrivacyPolicyForm,
    name: 'Legal Management Edit Answer',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_UPDATE_PRIVACY_POLICY],
    private: true,
  },
  {
    path: 'legal-management/privacy-policy/view',
    element: PrivacyPolicyForm,
    name: 'Legal Management View',
    permissions: [PERMISSIONS_CODES.LEGAL_MANAGEMENT_VIEW_PRIVACY_POLICY],
    private: true,
  },
];

export default LEGAL_MANAGEMENT_ROUTES;

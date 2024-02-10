interface AppInformation {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

type IPrivacyPolicy = AppInformation;
type ITermsConditions = AppInformation;
type IAboutUs = AppInformation;

export type { IAboutUs, ITermsConditions, IPrivacyPolicy };

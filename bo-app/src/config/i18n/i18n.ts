import { Languages } from 'common';
import { ar, en } from 'assets/locale/resources';
import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en,
  ar,
};

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[1];
export const getI18nConfig = (lng: string): InitOptions => ({
  ns,
  defaultNS,
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  },
  lng,
  fallbackLng: Languages.EN,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

const config = getI18nConfig(i18n.dir('rtl') ? Languages.AR : Languages.EN);
i18n.use(initReactI18next).init(config);

export default i18n;

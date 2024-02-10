import type { ISelect } from 'components/Select/Select';
import type { resources } from 'config/i18n/i18n';

export interface FilterFields<T> {
  label: string;
  name: keyof T;
  type: 'text' | 'select' | 'date';
  options?: ISelect[];
  namespace?: keyof (typeof resources)['en'];
  dir?: 'rtl' | 'ltr';
}

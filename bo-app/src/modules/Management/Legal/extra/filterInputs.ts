import type { FilterFields } from 'interfaces';
import type { LegalFiltersPayload } from '../interfaces';

const legalFilterInputs: FilterFields<LegalFiltersPayload>[] = [
  {
    name: 'titleAr',
    label: 'title_ar',
    type: 'text',
    dir: 'rtl',
  },
  {
    name: 'titleEn',
    label: 'title_en',
    type: 'text',
  },
  {
    name: 'active',
    label: 'status',
    type: 'select',
    options: [
      {
        label: 'status_active',
        value: 'true',
      },
      {
        label: 'status_inactive',
        value: 'false',
      },
    ],
  },
];

export default legalFilterInputs;

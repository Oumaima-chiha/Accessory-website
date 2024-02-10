import type { FilterFields } from 'interfaces';
import type { AboutUsFiltersPayload } from '../interfaces';

const aboutUsFilterInputs: FilterFields<AboutUsFiltersPayload>[] = [
  {
    name: 'titleEn',
    label: 'title_en',
    type: 'text',
  },
  {
    name: 'titleAr',
    label: 'title_ar',
    type: 'text',
    dir: 'rtl',
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

export default aboutUsFilterInputs;

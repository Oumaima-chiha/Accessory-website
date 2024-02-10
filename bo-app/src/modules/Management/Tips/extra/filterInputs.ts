import type { FilterFields } from 'interfaces';
import type { TipsFiltersPayload } from '../interfaces';

const filterInputsTips: FilterFields<TipsFiltersPayload>[] = [
  {
    name: 'labelEn',
    label: 'tips.tip_name_en',
    type: 'text',
  },
  {
    name: 'labelAr',
    label: 'tips.tip_name_ar',
    type: 'text',
    dir: 'rtl',
  },
  {
    name: 'status',
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

export default filterInputsTips;

import type { FilterFields } from 'interfaces';
import type {
  FAQCategoryFiltersPayload,
  FAQFiltersPayload,
} from '../interfaces';

const filterInputsFAQ: FilterFields<FAQFiltersPayload>[] = [
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
    name: 'descriptionEn',
    label: 'description_en',
    type: 'text',
  },
  {
    name: 'descriptionAr',
    label: 'description_ar',
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

const filterInputsFAQCategories: FilterFields<FAQCategoryFiltersPayload>[] = [
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

export { filterInputsFAQ, filterInputsFAQCategories };

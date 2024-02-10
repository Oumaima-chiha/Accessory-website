import type { FilterFields } from 'interfaces';
import type { NewsFiltersPayload, TopicFiltersPayload } from '../interfaces';

const filterInputsNews: FilterFields<NewsFiltersPayload>[] = [
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

const filterInputsTopics: FilterFields<TopicFiltersPayload>[] = [
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

export { filterInputsNews, filterInputsTopics };

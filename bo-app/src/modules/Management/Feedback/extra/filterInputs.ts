import type { FilterFields } from 'interfaces';
import type {
  FeedbackCategoryFiltersPayload,
  FeedbackFiltersPayload,
} from '../interfaces';
import { FeedbackStatus } from '../interfaces';

const filterInputsUsersFeedback: FilterFields<FeedbackFiltersPayload>[] = [
  {
    name: 'title',
    label: 'feedback.title',
    type: 'text',
  },
  {
    name: 'comment',
    label: 'feedback.question',
    type: 'text',
  },
  {
    name: 'answer',
    label: 'feedback.answer',
    type: 'text',
  },
  {
    name: 'status',
    label: 'status',
    type: 'select',
    options: [
      {
        label: 'status_pending',
        value: FeedbackStatus.PENDING,
      },
      {
        label: 'status_answered',
        value: FeedbackStatus.ANSWERED,
      },
    ],
  },
];

const filterInputsFeedbackCategories: FilterFields<FeedbackCategoryFiltersPayload>[] =
  [
    {
      name: 'nameAr',
      label: 'category.category_name_ar',
      type: 'text',
      dir: 'rtl',
    },
    {
      name: 'nameEn',
      label: 'category.category_name_en',
      type: 'text',
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

export { filterInputsUsersFeedback, filterInputsFeedbackCategories };

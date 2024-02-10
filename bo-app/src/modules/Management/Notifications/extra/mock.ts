import type { CustomCriteria } from 'interfaces/criteria';
import { CriteriaTypes } from 'interfaces/criteria';

const customCriteriaMockData: CustomCriteria[] = [
  {
    id: 1,
    data: {
      type: CriteriaTypes.RANGE,
      name: 'age',
      labelAr: 'عمر',
      labelEn: 'Age',
      targetField: 'target_field',
      max: 100,
      min: 0,
    },
  },
  {
    id: 2,
    data: {
      type: CriteriaTypes.SELECT,
      name: 'gender',
      labelAr: 'جنس',
      labelEn: 'Gender',
      targetField: 'target_field',
      options: [
        {
          value: 'option1',
          labelAr: 'الخيار 1',
          labelEn: 'Option 1',
        },
        {
          value: 'option2',
          labelAr: 'الخيار 2',
          labelEn: 'Option 2',
        },
        {
          value: 'option3',
          labelAr: 'الخيار 3',
          labelEn: 'Option 3',
        },
      ],
    },
  },
];

export default customCriteriaMockData;

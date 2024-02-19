import type { FilterFields } from 'interfaces';
import { rtlDirection } from 'utils/constant';
import type { BOUserFiltersPayload } from '../interfaces/filters';

const filterInputs: FilterFields<BOUserFiltersPayload>[] = [
  {
    name: 'firstname',
    label: 'firstName',
    type: 'text',
    dir: rtlDirection,
  },
  {
    name: 'lastname',
    label: 'lastName',
    type: 'text',
    dir: rtlDirection,
  },
  {
    name: 'email',
    label: 'email',
    type: 'text',
    dir: rtlDirection,
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

export default filterInputs;

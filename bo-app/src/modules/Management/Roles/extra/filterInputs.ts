import type { FilterFields } from 'interfaces';
import { rtlDirection } from 'utils/constant';
import type { RoleFiltersPayload } from '../interfaces';

const filterInputs: FilterFields<RoleFiltersPayload>[] = [
  {
    name: 'name',
    label: 'role_name',
    type: 'text',
    dir: rtlDirection,
  },
];

export default filterInputs;

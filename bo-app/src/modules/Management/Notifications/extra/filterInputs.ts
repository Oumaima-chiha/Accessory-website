import type { FilterFields } from 'interfaces';
import type { NotificationsFiltersPayload } from '../interfaces';
import { NotificationStatus, TargetType } from '../interfaces';

const filterInputsTips: FilterFields<NotificationsFiltersPayload>[] = [
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
        label: 'status_pending',
        value: NotificationStatus.PENDING,
      },
      {
        label: 'status_processing',
        value: NotificationStatus.PROCESSING,
      },
      {
        label: 'status_sent',
        value: NotificationStatus.SENT,
      },
    ],
  },
  {
    name: 'targetType',
    label: 'target',
    type: 'select',
    namespace: 'notifications',
    options: [
      {
        label: 'users_all',
        value: TargetType.ALL_USERS,
      },
      {
        label: 'users_guest',
        value: TargetType.GUEST_USERS,
      },
      {
        label: 'users_registered',
        value: TargetType.REGISTERED_USERS,
      },
    ],
  },
];

export default filterInputsTips;

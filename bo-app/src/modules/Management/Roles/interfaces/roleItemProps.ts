import type { IPermission, IRole } from 'models';
import type { Dispatch, SetStateAction } from 'react';

export interface IRoleComponentProps {
  retrievedRole?: IRole | null;
  setCheckedItems: Dispatch<SetStateAction<IPermission[]>>;
  checkedItems: IPermission[];
  readyOnly?: boolean;
  errorMessage: boolean;
  showErrorMessage: Dispatch<SetStateAction<boolean>>;
}

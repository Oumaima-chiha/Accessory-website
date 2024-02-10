import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import type {
  MutationTrigger,
  UseLazyQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import type { DeepKeys } from '@tanstack/react-table';
import type * as Yup from 'yup';
import type { FilterFields } from './filterInputs';
import type { IPaginationResponse } from './pagination';
export interface Columns<T = any> {
  header: string;
  accessor: DeepKeys<T> | 'action';
  cell?: (x?: any) => JSX.Element | string;
  actions?: Array<ActionsType>;
  size?: number;
  getRowData?: boolean;
  customEvent?: (columnToAccess: string) => void;
  customArg?: (data: any) => any;
  capitalizeField?: boolean;
}

export type LazyGetTriggerType = UseLazyQuery<
  QueryDefinition<any, any, any, IPaginationResponse<any>, any>
>;

export type MutationTriggerType = MutationTrigger<
  MutationDefinition<
    void,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>,
    string,
    Blob,
    string
  >
>;

export type FilterProps = {
  fields: FilterFields<any>[];
  actionToDispatch: ActionCreatorWithPayload<any>;
  destroyFilterAction?: ActionCreatorWithoutPayload;
  resetApiState?: ActionCreatorWithoutPayload<string>;
  validationSchema?: Yup.ObjectSchema<any>;
  activeFilters?: Record<string, any>;
  elementsPerRow?: number;
};

export type DataTableProps<Data extends object> = {
  data: Data[];
  queryTrigger: LazyGetTriggerType;
  exportTrigger?: {
    isLoading: boolean;
    trigger: MutationTriggerType;
  };
  canRefetch?: boolean;
  columns: Array<Columns<any>>;
  title?: string;
  minH?: string;
  hasBorder?: boolean;
  isLoading?: boolean;
  refetch?: () => Promise<any>;
  addOptions?: {
    addFunction?: () => void;
    label?: string;
    fullLabel?: string;
  };
  filter?: FilterProps | null;
};

export enum TABLE_ACTION {
  PRINT = 'print',
  IMPORT = 'import',
  DELETE = 'delete',
  VIEW = 'view',
  MORE = 'more',
  EDIT = 'edit',
  RESEND = 'resend',
  DOWNLOAD = 'download',
  ACTIVATE_USER = 'activate_user',
  DEACTIVATE_USER = 'deactivate_user',
  APPROVE_CONTENT = 'approve',
  DISAPPROVE_CONTENT = 'disapprove',
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
  ANSWER = 'answer',
}

export type ActionsType = {
  name: TABLE_ACTION | ((data: any) => string);
  handleClick: (data: any) => void;
  isDisabled?: (data: any) => boolean;
  isShown?: boolean;
  isApproval?: boolean;
  showConfirmationModal?: boolean;
};

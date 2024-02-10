import type { FORM_TYPE } from './enums/formType';

export interface FormProps<T> {
  form: T;
  type: FORM_TYPE;
}

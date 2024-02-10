interface CustomCriteria {
  id: number;
  data: RangeCriteria | SelectCriteria;
}

interface DefaultCriteriaFields {
  type: CriteriaTypes;
  name: string;
  labelAr: string;
  labelEn: string;
  targetField: string;
}

export enum CriteriaTypes {
  RANGE = 'RANGE',
  SELECT = 'ENUM',
}

export interface RangeCriteria extends DefaultCriteriaFields {
  max: number;
  min: number;
}

export interface SelectCriteria extends DefaultCriteriaFields {
  options: Options[];
}

interface Options {
  value: string;
  labelAr: string;
  labelEn: string;
}

export type { CustomCriteria };

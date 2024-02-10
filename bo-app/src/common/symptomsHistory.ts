import { IRecommendedSpecialist, IResults, IRiskFactor } from '../models';
import { Age, IInterview, IRegion, ISymptoms } from './checker';
import { Gender } from './enums/gender';
import { InterviewSteps } from './enums/interviewSteps';
import { TriageLevel } from './enums/triageLevel';
import { UserType } from './enums/userType';

interface InitialState {
  list: HistoryResponse[];
  filters: SymptomsHistoryFiltersPayload;
  currentPage: number;
}

interface IResultsDetailContent extends ISymptomsHistory {
  createdAt?: string;
}

interface ISymptomsHistory {
  id?: number;
  sex: Gender;
  age: Age & {
    date?: string;
  };
  type: UserType;
  riskFactor: IRiskFactor[];
  symptoms: ISymptoms[];
  regions?: IRegion[];
  interview: IInterview;
  triage: IResults;
  recommendedSpecialist?:IRecommendedSpecialist;
  interviewStep?: InterviewSteps;
}

interface PostHistoryPayload {
  data: ISymptomsHistory;
  isDraft?: boolean;
}
interface PostHistoryDraftPayload {
  data: Partial<ISymptomsHistory>;
  isDraft?: boolean;
}
interface HistoryResponse extends PostHistoryPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
  secureToken?: string | null;
  secureLink?: string | null;
  pinCode?: string | null;
}
interface SymptomsHistoryFiltersPayload {
  triageLevel?: TriageLevel;
  startDate?: string;
  endDate?: string;
}

interface SecureLinkPDFPayload {
  interviewId: number;
  secureToken: string;
  pinCode: string;
}

interface SecureLinkPayload {
  interviewId: number;
  pinCode: string;
  currentPage?: number;
  filters?: SymptomsHistoryFiltersPayload;
}

interface SecureLinkResponse {
  secureLink: string;
}

export type {
  InitialState as SymptomsHistoryInitialState,
  ISymptomsHistory,
  SymptomsHistoryFiltersPayload,
  PostHistoryPayload,
  PostHistoryDraftPayload,
  HistoryResponse,
  SecureLinkResponse,
  SecureLinkPayload,
  SecureLinkPDFPayload,
  IResultsDetailContent,
};
